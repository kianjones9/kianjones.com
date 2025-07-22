const fs = require('fs');
const path = require('path');
const { generateJavaScriptCode } = require('./load-posts');

function updateIndexHtml() {
    const data = generateJavaScriptCode();
    const indexPath = path.join(__dirname, 'index.html');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Update sidebar posts section
    const sidebarStart = '<div class="folder-content">';
    const sidebarEnd = '</div>';
    const sidebarPattern = new RegExp(
        `(${escapeRegex(sidebarStart)})[\\s\\S]*?(${escapeRegex(sidebarEnd)})`
    );
    
    const newSidebarContent = `${sidebarStart}
${data.sidebarItems}
                                    ${sidebarEnd}`;
    
    indexContent = indexContent.replace(sidebarPattern, newSidebarContent);
    
    // Update file content object
    const fileContentStart = 'const fileContent = {';
    const fileContentEnd = '            };';
    
    const newFileContent = `const fileContent = {
                'readme': \`<h1>Kian Jones</h1>

<p><strong>Infrastructure Engineer @ <a href="https://letta.com">Letta</a></strong><br>
Building the backbone for next-generation AI agents</p>

<h2>About</h2>

<p>Infrastructure specialist with deep expertise in cloud architecture, networking, 
and observability. Currently architecting scalable systems that enable AI agents 
to operate reliably at massive scale.</p>

<h2>Experience</h2>

<ul>
<li><strong>Letta</strong> - Infrastructure Engineer (AI Agent Platform)</li>
<li><strong>Covariant</strong> - Cloud & Infrastructure</li>
<li><strong>Meta</strong> - Platform Engineering</li>
<li><strong>Nokia</strong> - Network Infrastructure</li>
<li><strong>CENGN</strong> - Research & Development</li>
<li><strong>Environment Canada</strong> - Systems Engineering</li>
<li><strong>SurveyMonkey</strong> - Backend Infrastructure</li>
</ul>

<h2>Expertise</h2>

<h3>🏗️ Cloud Architecture</h3>
<p>AWS, GCP, Kubernetes, Terraform, Infrastructure as Code</p>

<h3>📊 Observability</h3>
<p>Monitoring, Logging, Distributed Tracing, Performance Metrics</p>

<h3>🌐 Networking</h3>
<p>Load Balancing, CDN, Service Mesh, Network Security</p>

<h3>🤖 AI Infrastructure</h3>
<p>GPU Clusters, Model Serving, Agent Orchestration, Auto-scaling</p>

<h2>Current Focus</h2>

<p>Building the infrastructure that powers thousands of concurrent AI agents at Letta.
From Kubernetes orchestration to observability systems, creating the foundation
for the future of AI agent interactions.</p>

<hr>
<p><em>Navigate using the file explorer → or try the terminal below ↓</em></p>\`,
                
                'bio': \`<h1>Bio</h1>

<h2>Kian Jones - Infrastructure Engineer</h2>

<p>Currently building the foundational systems that power AI agents at Letta. 
Passionate about creating robust, scalable infrastructure that enables the 
next generation of artificial intelligence to operate seamlessly.</p>

<h3>Background</h3>

<p>With extensive experience across cloud platforms, networking, and observability,
I specialize in designing systems that can handle massive scale while maintaining
reliability and performance.</p>

<h3>Philosophy</h3>

<p>Great infrastructure is invisible - it just works. My focus is on building
systems that developers and AI agents can rely on, allowing them to focus
on innovation rather than operational concerns.</p>\`,

                'contact': \`<h1>Contact</h1>

<h2>Get in Touch</h2>

<p><strong>Email</strong>: <a href="mailto:kian@kianjones.com">kian@kianjones.com</a><br>
<strong>LinkedIn</strong>: <a href="https://linkedin.com/in/kianjones">linkedin.com/in/kianjones</a><br>
<strong>GitHub</strong>: <a href="https://github.com/kianjones">github.com/kianjones</a><br>
<strong>Twitter</strong>: <a href="https://twitter.com/kianjones">@kianjones</a></p>

<h3>Open to Discuss</h3>

<ul>
<li>Infrastructure architecture and scaling challenges</li>
<li>AI/ML platform engineering opportunities</li>
<li>Cloud-native system design</li>
<li>Observability and monitoring strategies</li>
<li>Open source contributions</li>
</ul>

<hr>
<p><em>Always happy to talk about infrastructure, AI agents, and building scalable systems!</em></p>\`,

                'letta-infra': \`# Letta Infrastructure Project

## Overview

Building the scalable infrastructure backbone for Letta's AI agent platform.

### Responsibilities

- Kubernetes cluster management and optimization
- CI/CD pipeline design and implementation  
- Monitoring and observability systems
- Cost optimization and resource management

### Technologies

- **Cloud**: AWS, GCP
- **Orchestration**: Kubernetes, Docker
- **Monitoring**: Prometheus, Grafana, Jaeger
- **IaC**: Terraform, Helm

### Impact

Enabling thousands of concurrent AI agent conversations while maintaining 
sub-second response times and 99.9% uptime.\`,
${data.fileContentEntries}
            };`;
    
    const fileContentPattern = new RegExp(
        `${escapeRegex(fileContentStart)}[\\s\\S]*?${escapeRegex(fileContentEnd)}`,
        'g'
    );
    
    indexContent = indexContent.replace(fileContentPattern, newFileContent);
    
    // Update icons mapping
    const iconsPattern = /const icons = \{[\s\S]*?\};/;
    const newIcons = `const icons = {
                    'readme': '📄',
                    'bio': '👤', 
                    'contact': '📧',
                    'letta-infra': '🏗️',
${data.iconsEntries}
                };`;
    
    indexContent = indexContent.replace(iconsPattern, newIcons);
    
    // Update names mapping
    const namesPattern = /const names = \{[\s\S]*?\};/;
    const newNames = `const names = {
                    'readme': 'README.md',
                    'bio': 'bio.md',
                    'contact': 'contact.md', 
                    'letta-infra': 'letta-infrastructure.md',
${data.namesEntries}
                };`;
    
    indexContent = indexContent.replace(namesPattern, newNames);
    
    // Update terminal file system
    const terminalPattern = /'posts\/': \{[\s\S]*?\},/;
    const newTerminal = `'posts/': {
                        type: 'directory',
                        children: {
${data.terminalFiles}
                        }
                    },`;
    
    indexContent = indexContent.replace(terminalPattern, newTerminal);
    
    // Write updated content back
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('Successfully updated index.html with real post data');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (require.main === module) {
    updateIndexHtml();
}

module.exports = { updateIndexHtml };