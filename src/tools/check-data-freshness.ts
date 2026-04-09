/**
 * check_data_freshness — Check data staleness for each source.
 * Reports how old the database is and provides an update advisory.
 */

import type Database from '@ansvar/mcp-sqlite';
import { generateResponseMetadata, type ToolResponse } from '../utils/metadata.js';

export interface DataFreshnessResult {
  sources: SourceFreshness[];
  overall_status: 'fresh' | 'stale' | 'unknown';
  advisory?: string;
}

export interface SourceFreshness {
  name: string;
  built_at: string | null;
  age_days: number | null;
  status: 'fresh' | 'stale' | 'unknown';
  note?: string;
}

const STALE_THRESHOLD_DAYS = 30;

function daysSince(dateStr: string): number {
  const built = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - built.getTime()) / (1000 * 60 * 60 * 24));
}

export async function checkDataFreshness(
  db: InstanceType<typeof Database>,
): Promise<ToolResponse<DataFreshnessResult>> {
  let builtAt: string | null = null;
  try {
    const row = db.prepare(
      "SELECT value FROM db_metadata WHERE key = 'built_at'"
    ).get() as { value: string } | undefined;
    if (row) builtAt = row.value;
  } catch {
    // Table may not exist
  }

  let ageDays: number | null = null;
  let status: 'fresh' | 'stale' | 'unknown' = 'unknown';
  let note: string | undefined;

  if (builtAt) {
    ageDays = daysSince(builtAt);
    if (ageDays > STALE_THRESHOLD_DAYS) {
      status = 'stale';
      note = `Database is ${ageDays} days old (threshold: ${STALE_THRESHOLD_DAYS} days). Run the ingest pipeline to refresh.`;
    } else {
      status = 'fresh';
    }
  }

  const sources: SourceFreshness[] = [
    {
      name: 'Consultoría Jurídica del Poder Ejecutivo (consultoria.gov.do)',
      built_at: builtAt,
      age_days: ageDays,
      status,
      note,
    },
  ];

  const overallStatus = sources.every(s => s.status === 'fresh')
    ? 'fresh'
    : sources.some(s => s.status === 'stale')
      ? 'stale'
      : 'unknown';

  const advisory =
    overallStatus === 'stale'
      ? 'One or more sources are stale. Re-run scripts/ingest.ts and scripts/build-db.ts to refresh the database.'
      : overallStatus === 'unknown'
        ? 'Database build timestamp unavailable — freshness cannot be determined.'
        : undefined;

  return {
    results: {
      sources,
      overall_status: overallStatus,
      advisory,
    },
    _metadata: generateResponseMetadata(db),
  };
}
