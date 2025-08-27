#!/usr/bin/env python3
import json
import os
import re

def extract_prompt_from_markdown(file_path):
    """Extract the full prompt content from a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by the closing frontmatter delimiter
    parts = content.split('---', 2)
    if len(parts) >= 3:
        # The prompt is everything after the frontmatter
        prompt = parts[2].strip()
        return prompt
    return ""

def escape_json_string(s):
    """Properly escape a string for JSON."""
    # Replace backslashes first
    s = s.replace('\\', '\\\\')
    # Replace quotes
    s = s.replace('"', '\\"')
    # Replace newlines with literal \n
    s = s.replace('\n', '\\n')
    # Replace tabs
    s = s.replace('\t', '\\t')
    return s

# Load existing agents.json
agents_json_path = 'agent-gallery/src/data/agents.json'
with open(agents_json_path, 'r', encoding='utf-8') as f:
    agents = json.load(f)

# Update each agent with full prompt from markdown
agents_dir = 'agent-gallery/agents'
for agent in agents:
    md_file = os.path.join(agents_dir, f"{agent['id']}.md")
    if os.path.exists(md_file):
        full_prompt = extract_prompt_from_markdown(md_file)
        if full_prompt:
            agent['prompt'] = full_prompt
            print(f"Updated {agent['id']} - prompt length: {len(full_prompt)} characters")
        else:
            print(f"Warning: No prompt content found for {agent['id']}")
    else:
        print(f"Warning: Markdown file not found for {agent['id']}")

# Write updated agents.json
with open(agents_json_path, 'w', encoding='utf-8') as f:
    json.dump(agents, f, indent=2, ensure_ascii=False)

print(f"\nSuccessfully updated {agents_json_path}")