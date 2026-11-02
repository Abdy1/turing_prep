with open(r'c:\Users\Office\Documents\dubi\turing_prep\app\app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the premature closing brace after formatMarkdown
content = content.replace('    return formatted;\r\n  }\r\n}', '    return formatted;\r\n  }')
content = content.replace('    return formatted;\n  }\n}', '    return formatted;\n  }')

# Replace the broken closing at the very end
good_end = """}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.turingApp = new TuringApp();
});
"""

if '}\r\n);' in content:
    content = content.replace('}\r\n);', good_end)
elif '}\n);' in content:
    content = content.replace('}\n);', good_end)

with open(r'c:\Users\Office\Documents\dubi\turing_prep\app\app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("FIXED_APP_JS_SUCCESS")

