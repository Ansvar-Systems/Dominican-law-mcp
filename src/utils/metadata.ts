/**
 * Response metadata utilities for Dominican Republic Law MCP.
 */

import type Database from '@ansvar/mcp-sqlite';

export interface ResponseMetadata {
  data_source: string;
  jurisdiction: string;
  disclaimer: string;
  freshness?: string;
  note?: string;
  query_strategy?: string;
}

export interface ToolResponse<T> {
  results: T;
  _metadata: ResponseMetadata;
}

export function generateResponseMetadata(
  db: InstanceType<typeof Database>,
): ResponseMetadata {
  let freshness: string | undefined;
  try {
    const row = db.prepare(
      "SELECT value FROM db_metadata WHERE key = 'built_at'"
    ).get() as { value: string } | undefined;
    if (row) freshness = row.value;
  } catch {
    // Ignore
  }

  return {
    data_source: 'Dominican Republic Law (consultoria.gov.do) — Consultoría Jurídica del Poder Ejecutivo',
    jurisdiction: 'DO',
    disclaimer:
      'This data is sourced from the Consultoría Jurídica del Poder Ejecutivo of the Dominican Republic. ' +
      'The authoritative versions are maintained by the official legal portal (consultoria.gov.do). ' +
      'Always verify with the official Dominican Republic legal portal (consultoria.gov.do).',
    freshness,
  };
}
