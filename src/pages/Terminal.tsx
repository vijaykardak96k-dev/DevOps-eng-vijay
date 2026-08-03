import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface LogItem {
  type: 'prompt' | 'ascii' | 'system' | 'info' | 'success' | 'error';
  dir?: string;
  content: string;
}

const ASCII_LOGO = `
█░█ █ ░░█ ▄▀█ █▄█
▀▄▀ █ █▄█ █▀█ ░█░   
[ DevOps / SRE Operator Control Terminal v3.0 ]
`;

const FILESYSTEM: Record<string, string[]> = {
  '~': ['about.txt', 'skills.json', 'projects/', 'resume.pdf', 'certifications/'],
  '~/projects': ['retail-store.md', 'three-tier-aws.md', 'k8s-cluster.md'],
  '~/certifications': ['aws-cloud.txt', 'k8s-basics.txt'],
};

const FILE_CONTENTS: Record<string, string> = {
  'about.txt': `[SYSTEM OPERATOR PROFILE]
Role: DevOps / SRE Operator
Mission: Engineering high-availability cloud infrastructure, automated GitOps delivery pipelines, and self-healing Kubernetes clusters.
Focus: Zero-downtime deployments, infrastructure as code, and end-to-end system observability.`,
  'skills.json': `{
  "foundation": ["Linux", "Git", "Bash / Shell Scripting"],
  "containers": ["Docker", "Docker Compose"],
  "cicd": ["Jenkins", "GitHub Actions"],
  "cloud": ["AWS (EC2, S3, IAM, VPC)", "Terraform"],
  "orchestration": ["Kubernetes", "Helm"],
  "observability_sre": ["Prometheus", "Grafana", "ArgoCD"]
}`,
  'projects/retail-store.md': `# Retail Store Microservices
• Stack: Kubernetes, Helm, Ingress, Docker, GitHub Actions
• Impact: Automated build & deployment manifests for zero-downtime microservice rollouts.`,
  'projects/three-tier-aws.md': `# Three-Tier AWS Deployment
• Stack: AWS (EC2, VPC, S3), Terraform, Jenkins
• Impact: Modular IaC setup with automated backend state management and fault tolerance.`,
  'projects/k8s-cluster.md': `# Kubernetes Production Setup
• Stack: K8s, Ingress-NGINX, RBAC, Prometheus, Grafana
• Impact: Scoped namespace isolation, RBAC policies, custom alerting thresholds, and TLS routing.`,
};

const COMMAND_LIST = [
  'help', 'about', 'projects', 'skills', 'resume', 'github', 'linkedin', 
  'experience', 'education', 'certifications', 'kubectl', 'docker', 
  'terraform', 'helm', 'contact', 'clear', 'cls', 'ls', 'pwd', 'cd', 
  'cat', 'whoami', 'stats', 'sudo', 'rm', 'coffee', 'history', 'slo'
];

export default function Terminal() {
  const [currentDir, setCurrentDir] = useState<string>('~');
  const [history, setHistory] = useState<LogItem[]>([]);
  const [input, setInput] = useState<string>('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasBooted = useRef<boolean>(false);

  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  // Initial Boot Sequence (Runs once only)
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootSequence = [
      'Establishing connection to DevOps-Master node...',
      'Validating IAM policy permissions... [GRANTED]',
      'Connecting to Kubernetes API Server... [OK]',
      'Checking telemetry pipeline... [HEALTHY]',
      'Mounting DevOps / SRE control environment...',
      'Session ready.\n',
    ];

    let delay = 0;
    bootSequence.forEach((text, i) => {
      delay += 100;
      setTimeout(() => {
        setHistory((prev) => [...prev, { type: 'system', content: text }]);
        if (i === bootSequence.length - 1) {
          setHistory((prev) => [...prev, { type: 'ascii', content: ASCII_LOGO }]);
          setHistory((prev) => [
            ...prev,
            { type: 'info', content: 'Type "help" to inspect node capabilities or navigate using "ls", "cat", and "cd".' }
          ]);
          focusTerminal();
        }
      }, delay);
    });
  }, []);

  // Internal Terminal Scroll Only
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history, isExecuting]);

  // Command Execution Handler
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isExecuting) return;

    const rawCmd = input.trim();
    setInput('');

    if (!rawCmd) {
      setHistory((prev) => [...prev, { type: 'prompt', dir: currentDir, content: '' }]);
      focusTerminal();
      return;
    }

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setHistory((prev) => [...prev, { type: 'prompt', dir: currentDir, content: rawCmd }]);

    const parts = rawCmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setIsExecuting(true);
    await new Promise((res) => setTimeout(res, 180));

    executeCommand(mainCmd, args);
    setIsExecuting(false);
    
    setTimeout(focusTerminal, 10);
  };

  const executeCommand = (cmd: string, args: string[]) => {
    const addLog = (type: LogItem['type'], content: string) => {
      setHistory((prev) => [...prev, { type, content }]);
    };

    switch (cmd) {
      case 'clear':
      case 'cls':
        setHistory([]);
        break;

      case 'help':
        addLog('system', `
DevOps / SRE Operator Terminal Control Center:

Navigation
-----------
  ls                 - List directory contents
  cd <dir>           - Change directory (~, projects, certifications, ..)
  pwd                - Print current working directory path
  cat <file>         - Output file contents

System Operator Info
--------------------
  about              - Operator profile & architectural focus
  skills             - Technical stack, automation & cloud tools
  projects           - Highlighted DevOps / SRE implementations
  experience         - Engineering journey summary
  certifications     - Verifiable credentials
  stats              - Operational metrics & telemetry
  slo                - System reliability targets & SLA health

Actions & Links
---------------
  resume             - Download official PDF resume
  github             - Open GitHub profile
  linkedin           - Open LinkedIn profile
  contact            - Direct communication endpoints

Infrastructure Commands
------------------------
  kubectl get pods   - Inspect active cluster workloads
  docker ps          - Output active container instances
  terraform plan     - Run infrastructure drift detection
  helm list          - List deployed Kubernetes charts

Utilities
---------
  whoami             - Display current session user
  history            - Show terminal command buffer
  clear / cls        - Clear terminal display
`);
        break;

      case 'ls': {
        const files = FILESYSTEM[currentDir] || [];
        const formatted = files.map((f) => {
          if (f.endsWith('/')) return `<DIR> ${f}`;
          if (f.endsWith('.json')) return `[JSON] ${f}`;
          if (f.endsWith('.pdf')) return `[PDF]  ${f}`;
          return `       ${f}`;
        }).join('\n');
        addLog('info', formatted || 'Directory is empty.');
        break;
      }

      case 'pwd':
        addLog('info', `/home/devops-control/${currentDir.replace('~', '')}`);
        break;

      case 'cd': {
        const target = args[0] || '~';
        if (target === '..' || target === '../') {
          setCurrentDir('~');
        } else if (target === 'projects' || target === 'projects/') {
          setCurrentDir('~/projects');
        } else if (target === 'certifications' || target === 'certifications/') {
          setCurrentDir('~/certifications');
        } else if (target === '~') {
          setCurrentDir('~');
        } else {
          addLog('error', `cd: path not resolved: ${target}`);
        }
        break;
      }

      case 'cat': {
        const fileName = args[0];
        if (!fileName) {
          addLog('error', 'usage: cat <file_name>');
          break;
        }

        const fullPath = currentDir === '~' ? fileName : `${currentDir.replace('~/', '')}/${fileName}`;
        const content = FILE_CONTENTS[fileName] || FILE_CONTENTS[fullPath];

        if (content) {
          addLog('info', content);
        } else if (fileName === 'resume.pdf') {
          addLog('system', '📄 "resume.pdf" is binary asset. Run "resume" command to execute download.');
        } else {
          addLog('error', `cat: ${fileName}: Target not found`);
        }
        break;
      }

      case 'whoami':
        addLog('info', 'DevOps / SRE Operator');
        break;

      case 'about':
        addLog('info', FILE_CONTENTS['about.txt']);
        break;

      case 'skills':
        addLog('system', 'Evaluating node dependencies and operational skill tree...\n');
        addLog('success', `
✔ Linux System Administration & Shell Scripting
✔ Git Version Control & Branching Workflows
✔ Docker & Containerization Patterns
✔ CI/CD Pipelines (Jenkins, GitHub Actions)
✔ AWS Cloud Architecture (EC2, S3, IAM, VPC)
✔ Terraform Infrastructure as Code (IaC)
✔ Kubernetes Cluster Orchestration & Workloads
🟡 Helm Package Management & Custom Charts
🟡 GitOps Operations (ArgoCD)
🟡 Monitoring & Alerting (Prometheus, Grafana)
`);
        break;

      case 'projects':
        addLog('system', `
[PRODUCTION PIPELINES & DEPLOYMENTS]
1. Retail Store Microservices
   - Containerized multi-tier cluster orchestration with Helm & GitHub Actions.

2. Three-Tier AWS Architecture
   - Modular Terraform setup for fault-tolerant AWS cloud hosting.

3. Kubernetes Ingress & RBAC Hardening
   - Isolated namespaces, custom security policies, and TLS ingress routing.

💡 Tip: Run "cd projects" and "cat <project.md>" to inspect details!
`);
        break;

      case 'experience':
        addLog('info', `
[ENGINEERING JOURNEY]
• DevOps / SRE Operator:
  - Designed zero-downtime Kubernetes deployment specs and CI/CD pipelines.
  - Provisions reproducible cloud infrastructure using Terraform and AWS services.
  - Implements containerized microservices architecture with strict security standards.
`);
        break;

      case 'certifications':
        addLog('info', `
[CERTIFICATIONS & LAB ACCREDITATIONS]
• AWS Cloud Practitioner / Infrastructure Architecture Labs
• Kubernetes Container Orchestration & Security Hands-on
• Linux Systems Automation & Enterprise Administration
`);
        break;

      case 'stats':
      case 'slo':
        addLog('info', `
[RELIABILITY METRICS & TELEMETRY]
  • Target Service Availability : 99.99%
  • Mean Time to Recovery (MTTR): < 5 minutes
  • Kubernetes Specs Deployed   : 120+
  • Container Images Built      : 45+
  • Helm Charts Maintained     : 5+
  • Terraform States Managed    : Active
  • Coffee Fuel Consumption    : ☕ Infinite
`);
        break;

      case 'resume':
        addLog('success', '⚡ Fetching official resume PDF from bucket...');
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'DevOps_Resume.pdf';
        link.click();
        break;

      case 'github':
        addLog('success', '🔗 Route open: GitHub Profile');
        window.open('https://github.com', '_blank');
        break;

      case 'linkedin':
        addLog('success', '🔗 Opening LinkedIn network profile...');
        window.open('https://linkedin.com', '_blank');
        break;

      case 'contact':
        addLog('info', `
[DIRECT CONTACT ENDPOINTS]
  • GitHub   : https://github.com
  • Location : Maharashtra, India
`);
        break;

      case 'kubectl':
        if (args.join(' ') === 'get pods') {
          addLog('info', `
NAME                                READY   STATUS    RESTARTS   AGE
frontend-deployment-7c6d4b8-x29q1   1/1     Running   0          4d
backend-api-58b99c7f4-m8z9l         1/1     Running   0          4d
redis-cart-db-0                     1/1     Running   0          6d
ingress-nginx-controller-98f2a      1/1     Running   0          14d
`);
        } else if (args.join(' ') === 'get ingress') {
          addLog('info', `
CLASS   HOSTS                 ADDRESS        PORTS     AGE
nginx   devops.portfolio.local 192.168.1.10   80, 443   14d
`);
        } else {
          addLog('system', 'kubectl: try "kubectl get pods" or "kubectl get ingress"');
        }
        break;

      case 'docker':
        if (args.join(' ') === 'ps') {
          addLog('info', `
CONTAINER ID   IMAGE                COMMAND                PORTS                    NAMES
a8f912c3d1e2   portfolio-web:v3.0   "nginx -g 'daemon off" 0.0.0.0:80->80/tcp       web-frontend
e4b109f2a3c4   redis:7-alpine       "docker-entrypoint.s…" 0.0.0.0:6379->6379/tcp   cart-cache
`);
        } else {
          addLog('system', 'docker: try "docker ps"');
        }
        break;

      case 'terraform':
        if (args[0] === 'plan') {
          addLog('success', `
Terraform state validation completed:

  # aws_instance.k8s_node refreshed
  # aws_s3_bucket.terraform_state refreshed

No drift detected. Infrastructure state is aligned with configuration.
Plan: 0 to add, 0 to change, 0 to destroy.
`);
        } else {
          addLog('system', 'terraform: try "terraform plan"');
        }
        break;

      case 'helm':
        if (args[0] === 'list' || args.join(' ') === 'ls') {
          addLog('info', `
NAME            NAMESPACE   REVISION   UPDATED                                STATUS     CHART
retail-store    default     2          2026-03-15 14:22:01.109281 +0530 IST   deployed   retail-store-0.2.0
monitoring      monitoring  1          2026-02-10 10:11:42.821901 +0530 IST   deployed   kube-prometheus-stack-45.0.0
`);
        } else {
          addLog('system', 'helm: try "helm list"');
        }
        break;

      case 'history':
        addLog('info', cmdHistory.map((c, i) => ` ${i + 1}  ${c}`).join('\n'));
        break;

      case 'sudo':
        addLog('error', 'Security Alert: Direct root escalation disabled. Action logged to audit daemon. 🔒');
        break;

      case 'rm':
        if (args.join(' ').includes('-rf')) {
          addLog('error', 'Critical Safeguard triggered: Destructive deletion blocked on primary node! 🛡️');
        } else {
          addLog('error', 'rm: write-protection active on read-only node.');
        }
        break;

      case 'coffee':
      case 'brew':
        addLog('success', '☕ Injecting caffeine into automated pipelines... Ops efficiency +20%!');
        break;

      default:
        addLog('error', `command not found: "${cmd}". Type "help" for a list of available commands.`);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
      return;
    }

    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setHistory((prev) => [...prev, { type: 'prompt', dir: currentDir, content: `${input}^C` }]);
      setInput('');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;

      const matching = COMMAND_LIST.filter((c) => c.startsWith(input.toLowerCase()));
      if (matching.length === 1) {
        setInput(matching[0]);
      } else if (matching.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: 'prompt', dir: currentDir, content: input },
          { type: 'info', content: matching.join('   ') },
        ]);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
      return;
    }
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-md font-mono text-xs sm:text-sm cursor-text"
      onClick={focusTerminal}
    >
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>DevOps-Master:{currentDir}</span>
        </div>
        <span className="text-[10px] text-slate-600 font-sans uppercase tracking-widest font-bold">zsh</span>
      </div>

      {/* Terminal Display Area */}
      <div 
        ref={terminalContainerRef}
        className="p-4 h-[420px] overflow-y-auto space-y-2 leading-relaxed text-slate-300"
      >
        {history.map((log, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {log.type === 'prompt' && (
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">DevOps-Master:{log.dir}$</span>
                <span className="text-slate-100">{log.content}</span>
              </div>
            )}
            {log.type === 'ascii' && <pre className="text-cyan-400 font-bold leading-none overflow-x-auto">{log.content}</pre>}
            {log.type === 'system' && <span className="text-slate-400">{log.content}</span>}
            {log.type === 'info' && <span className="text-slate-200">{log.content}</span>}
            {log.type === 'success' && <span className="text-emerald-400 font-medium">{log.content}</span>}
            {log.type === 'error' && <span className="text-rose-400">{log.content}</span>}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">DevOps-Master:{currentDir}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={isExecuting}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={focusTerminal}
            className="flex-1 bg-transparent text-slate-100 outline-none border-none focus:ring-0 font-mono p-0"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}