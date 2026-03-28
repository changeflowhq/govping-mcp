# GovPing Skill

Free regulatory intelligence for Claude Code, Cursor, and any agent that supports the [Agent Skills standard](https://agentskills.io).

Search 27,000+ regulatory changes across 2,000+ government sources. No API key required.

## Install

### Claude Code
```bash
# Copy to your project
mkdir -p .claude/skills/govping
cp SKILL.md .claude/skills/govping/

# Or clone directly
git clone https://github.com/stevebutterworth/govping-skill .claude/skills/govping
```

### skills.sh
```bash
npx skillsadd stevebutterworth/govping-skill
```

### Manual
Copy `SKILL.md` into `.claude/skills/govping/` in any project.

## Usage

Ask Claude about regulatory changes:
- "What has the FDA done about drug safety this month?"
- "Search for SEC enforcement actions against broker-dealers"
- "Show me urgent OSHA citations"
- "EPA PFAS water regulations since January"

Claude will automatically invoke the skill and call the GovPing API.

## What You Get

Structured regulatory intelligence in [ORCA format](https://govping.org/orca):
- Attention level (Urgent / Priority review / Routine)
- Authority, instrument type, regulatory stage
- AI-generated summary and analysis
- Compliance deadlines and required actions
- Penalty information
- Affected parties and related frameworks

## Coverage

2,000+ government sources: FDA, SEC, OSHA, EPA, CFPB, FTC, DOJ, FINRA, state AGs, courts, USPTO, EPO, UK FCA, EU ESMA, and hundreds more.

## Links

- [GovPing](https://govping.org) - Free regulatory intelligence
- [ORCA Spec](https://govping.org/orca) - Data format specification
- [Changeflow](https://changeflow.com) - Enterprise web intelligence platform
- [GovPing MCP Server](https://github.com/stevebutterworth/govping-mcp) - MCP integration

## License

MIT
