# Coverage Index -- DO Law MCP

> Auto-generated from census data. Do not edit manually.
> Generated: 2026-02-28

## Source

| Field | Value |
|-------|-------|
| Authority | Consultoría Jurídica del Poder Ejecutivo |
| Portal | [consultoria.gov.do](https://www.consultoria.gov.do/consulta/) |
| License | Government Open Data |
| Census date | 2026-02-28 |

## Summary

| Metric | Count |
|--------|-------|
| Total laws enumerated | 12,480 |
| Ingestable | 12,480 |
| Ingested | 600 |
| Excluded | 0 |
| Provisions extracted | 2,194 |
| Definitions extracted | 1 |
| **Coverage** | **4.8%** |

## Notes

- Census covers the full Consultoría Jurídica corpus (12,480 laws discovered via ASP.NET MVC search with CSRF token)
- Laws span from 1855 to 1997 in the census
- First 600 laws ingested for initial database build
- PDF downloads via /Consulta/Home/FileManagement endpoint with session cookies
- Text extraction via pdftotext (poppler-utils)
- Parser handles both modern "Artículo N.-" and older "ARTICULO No.-" formats with ordinal suffixes
- 13 laws had zero provisions (scanned PDFs with insufficient OCR text)
- Full ingestion of remaining 11,880 laws can be done with `npm run ingest`
- Resume support: re-running ingest skips already-processed laws
