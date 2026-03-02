# Dominican Republic Law MCP Server

**The Senado de la República Dominicana alternative for the AI age.**

[![npm version](https://badge.fury.io/js/@ansvar%2Fdominican-law-mcp.svg)](https://www.npmjs.com/package/@ansvar/dominican-law-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue)](https://registry.modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub stars](https://img.shields.io/github/stars/Ansvar-Systems/Dominican-law-mcp?style=social)](https://github.com/Ansvar-Systems/Dominican-law-mcp)
[![CI](https://github.com/Ansvar-Systems/Dominican-law-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/Dominican-law-mcp/actions/workflows/ci.yml)
[![Database](https://img.shields.io/badge/database-pre--built-green)](https://github.com/Ansvar-Systems/Dominican-law-mcp)

Query **Dominican Republic statutes** -- from Ley 172-13 on data protection and the Código Penal to the Código de Trabajo and Código Civil -- directly from Claude, Cursor, or any MCP-compatible client.

If you're building legal tech, compliance tools, or doing Dominican legal research, this is your verified reference database.

Built by [Ansvar Systems](https://ansvar.eu) -- Stockholm, Sweden

---

## Why This Exists

Dominican legal research is scattered across senado.gob.do, camaradediputados.gob.do, and consultoria.gov.do. Whether you're:
- A **lawyer** validating citations in a brief or contract
- A **compliance officer** checking whether a statute is still in force
- A **legal tech developer** building tools on Dominican law
- A **researcher** tracing legislative developments across the Congreso Nacional

...you shouldn't need multiple browser tabs and manual cross-referencing. Ask Claude. Get the exact provision. With context.

This MCP server makes Dominican Republic law **searchable, cross-referenceable, and AI-readable**.

---

## Quick Start

### Use Remotely (No Install Needed)

> Connect directly to the hosted version -- zero dependencies, nothing to install.

**Endpoint:** `https://dominican-law-mcp.vercel.app/mcp`

| Client | How to Connect |
|--------|---------------|
| **Claude.ai** | Settings > Connectors > Add Integration > paste URL |
| **Claude Code** | `claude mcp add dominican-law --transport http https://dominican-law-mcp.vercel.app/mcp` |
| **Claude Desktop** | Add to config (see below) |
| **GitHub Copilot** | Add to VS Code settings (see below) |

**Claude Desktop** -- add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "dominican-law": {
      "type": "url",
      "url": "https://dominican-law-mcp.vercel.app/mcp"
    }
  }
}
```

**GitHub Copilot** -- add to VS Code `settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "dominican-law": {
      "type": "http",
      "url": "https://dominican-law-mcp.vercel.app/mcp"
    }
  }
}
```

### Use Locally (npm)

```bash
npx @ansvar/dominican-law-mcp
```

**Claude Desktop** -- add to `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dominican-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/dominican-law-mcp"]
    }
  }
}
```

**Cursor / VS Code:**

```json
{
  "mcp.servers": {
    "dominican-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/dominican-law-mcp"]
    }
  }
}
```

---

## Example Queries

Once connected, just ask naturally (in Spanish or English):

- *"¿Qué dice la Ley 172-13 sobre protección de datos personales respecto al consentimiento?"*
- *"Buscar disposiciones sobre protección de datos personales en la legislación dominicana"*
- *"¿Está vigente el Código Penal Dominicano?"*
- *"Buscar artículos sobre contrato de trabajo en el Código de Trabajo"*
- *"¿Qué establece el Código Civil sobre obligaciones?"*
- *"Buscar legislación sobre sociedades comerciales en República Dominicana"*
- *"Validar la cita Ley 479-08 sobre Sociedades Comerciales"*
- *"What does the Personal Data Protection Law (172-13) say about data subject rights?"*

---

## What's Included

| Category | Count | Details |
|----------|-------|---------|
| **Statutes** | Ingestion in progress | Legislation from consultoria.gov.do, senado.gob.do |
| **Provisions** | Ingestion in progress | Full-text searchable with FTS5 |
| **Database Size** | ~206 MB | Optimized SQLite, portable |
| **Legal Definitions** | Table reserved | Extraction planned for upcoming release |
| **Freshness Checks** | Automated | Drift detection against official sources |

> **Note:** This server is in active ingestion. The database infrastructure is deployed and operational. Statute content is being populated from authoritative Dominican sources. Use `list_sources` to see current coverage, and `about` for the latest statistics.

**Verified data only** -- every citation is validated against official sources (consultoria.gov.do, Senado, Cámara de Diputados). Zero LLM-generated content.

---

## Why This Works

**Verbatim Source Text (No LLM Processing):**
- All statute text is ingested from official Dominican government sources (consultoria.gov.do, senado.gob.do, camaradediputados.gob.do)
- Provisions are returned **unchanged** from SQLite FTS5 database rows
- Zero LLM summarization or paraphrasing -- the database contains statute text, not AI interpretations

**Smart Context Management:**
- Search returns ranked provisions with BM25 scoring (safe for context)
- Provision retrieval gives exact text by statute identifier + article number
- Cross-references help navigate without loading everything at once

**Technical Architecture:**
```
consultoria.gov.do / senado.gob.do --> Parse --> SQLite --> FTS5 snippet() --> MCP response
                                         ^                        ^
                                  Provision parser         Verbatim database query
```

### Traditional Research vs. This MCP

| Traditional Approach | This MCP Server |
|---------------------|-----------------|
| Search consultoria.gov.do by statute name | Search by plain Spanish: *"protección de datos consentimiento"* |
| Navigate multi-article statutes manually | Get the exact provision with context |
| Manual cross-referencing between laws | `build_legal_stance` aggregates across sources |
| "¿Está vigente esta ley?" -- check manually | `check_currency` tool -- answer in seconds |
| Find international alignment -- search manually | `get_eu_basis` -- linked frameworks instantly |
| No API, no integration | MCP protocol -- AI-native |

**Traditional:** Search portal -> Navigate HTML -> Ctrl+F -> Cross-reference between statutes -> Repeat

**This MCP:** *"¿Qué dice la Ley 172-13 sobre el derecho de acceso a los datos personales?"* -> Done.

---

## Available Tools (13)

### Core Legal Research Tools (8)

| Tool | Description |
|------|-------------|
| `search_legislation` | FTS5 full-text search across provisions with BM25 ranking. Supports Spanish and English queries |
| `get_provision` | Retrieve specific provision by statute identifier + article number |
| `check_currency` | Check if a statute is in force, amended, or repealed |
| `validate_citation` | Validate citation against database -- zero-hallucination check |
| `build_legal_stance` | Aggregate citations from multiple statutes for a legal topic |
| `format_citation` | Format citations per Dominican Republic conventions |
| `list_sources` | List all available statutes with metadata and coverage scope |
| `about` | Server info, capabilities, dataset statistics, and coverage summary |

### International Law Integration Tools (5)

| Tool | Description |
|------|-------------|
| `get_eu_basis` | Get EU directives/regulations that a Dominican statute aligns with (e.g., Ley 172-13 and GDPR adequacy) |
| `get_dominican_implementations` | Find Dominican laws aligning with a specific international framework |
| `search_eu_implementations` | Search EU documents with Dominican alignment counts |
| `get_provision_eu_basis` | Get international law references for a specific provision |
| `validate_eu_compliance` | Check alignment status of Dominican statutes against EU/OAS frameworks |

---

## International Law Alignment

The Dominican Republic is not an EU member state. The international alignment tools cover the frameworks that matter for Dominican law practice:

- **OAS frameworks** -- Organization of American States conventions and model laws (including the OAS Model Law on Data Protection)
- **CAFTA-DR** -- Dominican Republic-Central America-United States Free Trade Agreement obligations
- **CARICOM observer** -- Caribbean Community frameworks and alignment
- **Ley 172-13** aligns with international data protection principles; the `get_eu_basis` tool maps these to GDPR-equivalent provisions for cross-reference
- **Código de Trabajo** aligns with ILO conventions and CAFTA-DR labor chapters

The international bridge tools allow you to explore alignment relationships -- checking which Dominican provisions correspond to international requirements, and vice versa.

> **Note:** International cross-references reflect alignment and treaty obligations, not transposition. The Dominican Republic adopts its own legislative approach, and these tools help identify where Dominican and international law address similar domains.

---

## Data Sources & Freshness

All content is sourced from authoritative Dominican legal databases:

- **[Consultoría Jurídica del Poder Ejecutivo](https://consultoria.gov.do/)** -- Official executive-branch legal database
- **[Senado de la República](https://senado.gob.do/)** -- Senate legislation portal
- **[Cámara de Diputados](https://camaradediputados.gob.do/)** -- Chamber of Deputies legislation
- **[Congreso Nacional](https://congreso.gob.do/)** -- National Congress records

### Data Provenance

| Field | Value |
|-------|-------|
| **Authority** | Consultoría Jurídica del Poder Ejecutivo, Congreso Nacional |
| **Primary language** | Spanish |
| **License** | Public domain (Dominican government publications) |
| **Coverage** | Dominican Republic national legislation |

### Automated Freshness Checks

A [GitHub Actions workflow](.github/workflows/check-updates.yml) monitors Dominican legal sources for changes:

| Check | Method |
|-------|--------|
| **Statute amendments** | Drift detection against known provision anchors |
| **New statutes** | Comparison against official gazette and portal indexes |
| **Repealed statutes** | Status change detection |

**Verified data only** -- every citation is validated against official sources. Zero LLM-generated content.

---

## Security

This project uses multiple layers of automated security scanning:

| Scanner | What It Does | Schedule |
|---------|-------------|----------|
| **CodeQL** | Static analysis for security vulnerabilities | Weekly + PRs |
| **Semgrep** | SAST scanning (OWASP top 10, secrets, TypeScript) | Every push |
| **Gitleaks** | Secret detection across git history | Every push |
| **Trivy** | CVE scanning on filesystem and npm dependencies | Daily |
| **Socket.dev** | Supply chain attack detection | PRs |
| **Dependabot** | Automated dependency updates | Weekly |

See [SECURITY.md](SECURITY.md) for the full policy and vulnerability reporting.

---

## Important Disclaimers

### Legal Advice

> **THIS TOOL IS NOT LEGAL ADVICE**
>
> Statute text is sourced from official Dominican government publications. However:
> - This is a **research tool**, not a substitute for professional legal counsel
> - **Court case coverage is not included** -- do not rely solely on this for case law research
> - **Verify critical citations** against primary sources before court filings
> - **International cross-references** reflect alignment relationships, not formal transposition
> - **Database is in active ingestion** -- use `list_sources` to verify current coverage before relying on a specific statute

**Before using professionally, read:** [DISCLAIMER.md](DISCLAIMER.md) | [SECURITY.md](SECURITY.md)

### Client Confidentiality

Queries go through the Claude API. For privileged or confidential matters, use on-premise deployment.

### Bar Association Reference

For professional use, consult the **Colegio de Abogados de la República Dominicana** guidelines on AI-assisted legal research.

---

## Development

### Setup

```bash
git clone https://github.com/Ansvar-Systems/Dominican-law-mcp
cd Dominican-law-mcp
npm install
npm run build
npm test
```

### Running Locally

```bash
npm run dev                                       # Start MCP server
npx @anthropic/mcp-inspector node dist/index.js   # Test with MCP Inspector
```

### Data Management

```bash
npm run ingest              # Ingest statutes from Dominican sources
npm run build:db            # Rebuild SQLite database
npm run drift:detect        # Run drift detection against anchors
npm run check-updates       # Check for source updates
npm run census              # Generate coverage census
```

### Performance

- **Search Speed:** <100ms for most FTS5 queries
- **Database Size:** ~206 MB (optimized, portable)
- **Reliability:** Validated ingestion pipeline

---

## Related Projects: Complete Compliance Suite

This server is part of **Ansvar's Compliance Suite** -- MCP servers that work together for end-to-end compliance coverage:

### [@ansvar/eu-regulations-mcp](https://github.com/Ansvar-Systems/EU_compliance_MCP)
**Query 49 EU regulations directly from Claude** -- GDPR, AI Act, DORA, NIS2, MiFID II, eIDAS, and more. Full regulatory text with article-level search. `npx @ansvar/eu-regulations-mcp`

### [@ansvar/us-regulations-mcp](https://github.com/Ansvar-Systems/US_Compliance_MCP)
**Query US federal and state compliance laws** -- HIPAA, CCPA, SOX, GLBA, FERPA, and more. `npx @ansvar/us-regulations-mcp`

### [@ansvar/security-controls-mcp](https://github.com/Ansvar-Systems/security-controls-mcp)
**Query 261 security frameworks** -- ISO 27001, NIST CSF, SOC 2, CIS Controls, SCF, and more. `npx @ansvar/security-controls-mcp`

**80+ national law MCPs** covering Tanzania, Namibia, Uganda, Paraguay, Sri Lanka, Brazil, Colombia, Mexico, Canada, UK, Germany, France, and more.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Priority areas:
- Statute ingestion expansion (additional sources: Gaceta Oficial)
- Court case law coverage (Suprema Corte de Justicia, Tribunal Constitucional)
- International law alignment expansion (OAS, CAFTA-DR cross-references)
- Historical statute versions and amendment tracking

---

## Roadmap

- [x] Database infrastructure deployed and operational (~206 MB)
- [x] MCP server with all 13 tools
- [x] Vercel Streamable HTTP deployment
- [x] npm package publication
- [ ] Statute corpus ingestion (consultoria.gov.do, Senado)
- [ ] Court case law (Suprema Corte de Justicia)
- [ ] Gaceta Oficial integration for amendment tracking
- [ ] OAS convention cross-references
- [ ] Historical statute versions

---

## Citation

If you use this MCP server in academic research:

```bibtex
@software{dominican_law_mcp_2026,
  author = {Ansvar Systems AB},
  title = {Dominican Republic Law MCP Server: AI-Powered Legal Research Tool},
  year = {2026},
  url = {https://github.com/Ansvar-Systems/Dominican-law-mcp},
  note = {Dominican Republic national legislation with full-text search}
}
```

---

## License

Apache License 2.0. See [LICENSE](./LICENSE) for details.

### Data Licenses

- **Statutes & Legislation:** Dominican Republic government (public domain)
- **International Metadata:** Public domain

---

## About Ansvar Systems

We build AI-accelerated compliance and legal research tools for the global market. This MCP server makes Dominican Republic law accessible to legal professionals and compliance teams worldwide.

So we're open-sourcing it. Navigating Dominican statutes shouldn't require a law degree.

**[ansvar.eu](https://ansvar.eu)** -- Stockholm, Sweden

---

<p align="center">
  <sub>Built with care in Stockholm, Sweden</sub>
</p>
