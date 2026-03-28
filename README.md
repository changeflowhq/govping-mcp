# GovPing MCP Server

Free regulatory intelligence for AI agents. Search 27,000+ regulatory changes across 2,000+ government sources worldwide.

**No API key required.** Public data, open access.

## What is GovPing?

[GovPing](https://govping.org) monitors government and regulatory websites for changes and publishes structured data in [ORCA format](https://govping.org/orca) (Open Regulatory Change Annotation). When an FDA guidance page gets quietly revised, a state AG issues an enforcement action, or OSHA publishes new citations, GovPing detects it, enriches it with AI, and makes it searchable.

GovPing is a project of [Changeflow](https://changeflow.com).

## Quick Start

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "govping": {
      "command": "npx",
      "args": ["govping-mcp-server"]
    }
  }
}
```

Then ask Claude: *"Search GovPing for recent FDA enforcement actions"*

### Remote (Harvey, OpenAI, Claude Code)

Connect directly to the Streamable HTTP endpoint:

```
POST https://changeflow.com/govping/mcp
Content-Type: application/json
Accept: application/json, text/event-stream
```

No authentication required. Rate limit: 100 requests/hour.

## Tools

### search_changes

Search regulatory changes by natural language query with entity detection.

```
"What has the SEC said about cybersecurity disclosure?"
"Urgent FDA enforcement actions against pharmaceutical companies"
"EPA PFAS water regulations since 2026-01-01"
```

**Parameters:**
- `query` (required) - Natural language search
- `agency` - Filter by agency (FDA, SEC, OSHA, EPA, etc.)
- `jurisdiction` - Filter by jurisdiction (US, GB, EU, US-CA, etc.)
- `attention_level` - Urgent, Priority review, or Routine
- `instrument_type` - Enforcement, Rule, Guidance, Notice, Consultation, FAQ
- `since` - ISO 8601 date
- `limit` - Max results (default 20, max 50)

### get_change

Get full ORCA-structured details for a single regulatory change.

**Parameters:**
- `id` - Numeric change ID
- `slug` - URL slug

Returns all enriched fields: summary, analysis, compliance deadlines, required actions, penalty info, affected parties, related frameworks, CFR references, and more.

### list_sources

Browse GovPing's monitored regulatory sources.

**Parameters:**
- `category` - Category slug (e.g. healthcare-pharma, financial-services)
- `jurisdiction` - Jurisdiction code (e.g. US, GB, EU)
- `agency` - Agency tag (e.g. FDA, SEC)
- `limit` - Max results (default 50, max 200)

### get_schema

Returns the ORCA field definitions so your AI understands the data structure.

## ORCA Format

Every change is structured in [ORCA](https://govping.org/orca) (Open Regulatory Change Annotation) format with 40+ fields across 7 groups:

- **Identity** - change ID, title, source URL, citation
- **Authority** - issuing agency, jurisdiction
- **Classification** - instrument type, attention level, regulatory stage
- **Taxonomy** - regulatory area, applies to, related frameworks (HIPAA, SOX, BSA/AML, etc.)
- **Temporal** - effective date, compliance deadline, comment close date
- **Intelligence** - AI summary, analysis, required actions, penalty info
- **References** - CFR sections, docket IDs, section titles

## Coverage

- 2,000+ government and regulatory sources
- US federal agencies, 50 states, UK, EU, Canada, Australia, and more
- FDA, SEC, OSHA, EPA, CFPB, FTC, DOJ, FINRA, state AGs, courts, and hundreds more
- Checked hourly to daily depending on source

## Links

- [GovPing](https://govping.org) - Free regulatory intelligence
- [ORCA Spec](https://govping.org/orca) - Open Regulatory Change Annotation
- [Changeflow](https://changeflow.com) - Enterprise web intelligence platform
- [GovPing Search](https://changeflow.com/govping/search) - Search the index directly

## Rate Limits

- 100 requests per hour per IP (HTTP endpoint)
- Need higher limits? Email hello@changeflow.com

## License

MIT
