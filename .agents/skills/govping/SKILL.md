---
name: govping
description: "Search regulatory changes across 2,000+ government sources. Use when the user asks about FDA, SEC, OSHA, EPA, CFPB, or any government agency activity. Also use for enforcement actions, regulatory updates, compliance deadlines, guidance changes, or court rulings."
allowed-tools: WebFetch, Bash(curl *), Read
---

# GovPing - Regulatory Intelligence

Search 27,000+ structured regulatory changes across 2,000+ government sources. Free, no API key.

## API Endpoint

```
POST https://changeflow.com/govping/mcp
Content-Type: application/json
Accept: application/json
```

All requests use JSON-RPC 2.0 format.

## Tools

### search_changes

Search regulatory changes by natural language query.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_changes",
    "arguments": {
      "query": "FDA enforcement actions against pharmaceutical companies",
      "limit": 10
    }
  }
}
```

**Arguments:**
- `query` (required) - natural language search
- `agency` - filter by agency: FDA, SEC, OSHA, EPA, CFPB, etc.
- `jurisdiction` - filter: US, GB, EU, US-CA, etc.
- `attention_level` - Urgent, Priority review, or Routine
- `instrument_type` - Enforcement, Rule, Guidance, Notice, Consultation, FAQ
- `since` - ISO 8601 date (e.g. 2026-01-01)
- `limit` - max results (default 20, max 50)

### get_change

Get full details on a single regulatory change.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_change",
    "arguments": { "id": 7779 }
  }
}
```

**Arguments:** `id` (integer) or `slug` (string)

### list_sources

Browse monitored government sources.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "list_sources",
    "arguments": { "agency": "FDA", "limit": 10 }
  }
}
```

**Arguments:** `category`, `jurisdiction`, `agency`, `limit`

### get_schema

Returns ORCA field definitions. No arguments.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_schema",
    "arguments": {}
  }
}
```

## How to Call

Use WebFetch to POST to the endpoint:

```
WebFetch POST https://changeflow.com/govping/mcp
Body: {"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_changes","arguments":{"query":"USER_QUERY","limit":10}}}
```

The response contains `result.content[0].text` which is a JSON string. Parse it to get the results.

## Presenting Results

1. **Lead with attention level** - Urgent items first, then Priority review, then Routine
2. **Show key facts** - authority, instrument type, date, dollar amounts
3. **Quote the summary** - use the `summary` field directly
4. **Link to detail** - each change has a `url` field pointing to the full page
5. **Mention affected parties** - use `applies_to` to say who needs to act
6. **Flag deadlines** - highlight `compliance_deadline` and `effective_date`

## Example Output Format

When presenting regulatory changes to the user:

**Urgent: FDA Warning Letter to Acme Corp**
FDA issued a warning letter for CGMP violations in drug manufacturing. $250,000 civil penalty proposed.
- Authority: FDA | Type: Enforcement | Detected: Mar 15, 2026
- Applies to: Drug manufacturers
- [View full details](https://changeflow.com/govping/healthcare-pharma/fda-warning-letter-acme-2026-03-15)

## Coverage

- US federal agencies (FDA, SEC, OSHA, EPA, CFPB, FTC, DOJ, FINRA, and 200+)
- 50 US states (attorneys general, insurance commissioners, banking regulators)
- UK (FCA, ICO, MHRA, CMA), EU (ESMA, EBA, EIOPA, ECB), Canada, Australia
- Courts (federal circuits, state courts)
- Patent offices (USPTO, EPO, WIPO)

## Links

- [GovPing](https://govping.org) - Free regulatory intelligence
- [ORCA Spec](https://govping.org/orca) - Open Regulatory Change Annotation
- [Changeflow](https://changeflow.com) - Enterprise web intelligence
- [GovPing Search](https://changeflow.com/govping/search) - Search the index directly
