export interface Tech { name: string; role: string }
export interface Project {
  id: string;
  num: string;
  title: string;
  summary: string;
  type: string;
  tags: string[];
  tech: Tech[];
  repo: string;
  overview: string;
  objective: string;
  flow: { nodes: string[]; note: string; variant: "pipeline" | "layers" | "tiers" };
  primer: { heading: string; body: string }[];
  /** Fill these from the real repository. Leave a field undefined and its section is omitted. */
  evidence?: {
    steps?: string[];
    config?: { caption: string; language: string; code: string }[];
    verification?: string[];
    challenges?: { problem: string; fix: string }[];
    learned?: string[];
    deployment?: string[];
    images?: { src: string; alt: string }[];
  };
  related: string[];
}

const gh = (r: string) => `https://github.com/vijaykardak96k-dev/${r}`;

export const projects: Project[] = [
  {
    id: "retail-store-microservices", num: "01",
    title: "Retail Store Microservices Deployment",
    summary: "A multi-service retail application containerised with Docker and deployed to Kubernetes with MongoDB, NGINX Ingress routing and a Helm chart.",
    type: "Kubernetes workloads", tags: ["Kubernetes", "Containers"],
    tech: [
      { name: "Docker", role: "Packages each service as an image" },
      { name: "Kubernetes", role: "Runs the workloads and service discovery" },
      { name: "MongoDB", role: "Application data store" },
      { name: "NGINX Ingress", role: "Routes external HTTP traffic to services" },
      { name: "Helm", role: "Templates and parameterises the manifests" },
    ],
    repo: gh("retail-store-microservices-k8s"),
    overview: "Deploys a retail store application, split into separate services, onto a Kubernetes cluster. The work covers building container images, defining Kubernetes workloads and Services, running MongoDB, exposing the app through an Ingress and packaging the configuration as a Helm chart.",
    objective: "Show the full path from containerised application code to a reachable, verified deployment on Kubernetes, including how services find each other and how traffic enters the cluster.",
    flow: { nodes: ["Client", "NGINX Ingress", "Kubernetes Services", "Application pods", "MongoDB"], note: "Conceptual flow from the project scope; the repository has the exact configuration.", variant: "layers" },
    primer: [
      { heading: "How services talk to each other", body: "Each workload sits behind a ClusterIP Service, which gives pods a stable DNS name inside the cluster (service.namespace.svc). Services call each other by that name instead of by pod IP, because pod IPs change whenever a pod is rescheduled." },
      { heading: "Why Helm here", body: "Helm renders the same manifest templates from a values file. That keeps image tags, ports and environment-specific settings in one place instead of being edited across many YAML files." },
    ],
    related: ["kubernetes-ingress-networking", "jenkins-cicd-pipeline"],
  },
  {
    id: "jenkins-cicd-pipeline", num: "02",
    title: "Production-Style CI/CD Pipeline",
    summary: "A Jenkins pipeline that builds a Maven project, checks it with SonarQube and Trivy, stores artifacts in Nexus and deploys to Kubernetes.",
    type: "CI/CD", tags: ["CI/CD", "Kubernetes"],
    tech: [
      { name: "Jenkins", role: "Orchestrates the pipeline stages" },
      { name: "Maven", role: "Builds and packages the Java application" },
      { name: "SonarQube", role: "Static code analysis and quality gate" },
      { name: "Trivy", role: "Scans files and images for known vulnerabilities" },
      { name: "Nexus", role: "Stores build artifacts" },
      { name: "Kubernetes", role: "Deployment target" },
    ],
    repo: gh("k8s-cicd-pipeline-jenkins"),
    overview: "A source-to-deployment pipeline that combines a build, code-quality analysis, vulnerability scanning, artifact storage and a Kubernetes deployment in one Jenkins job.",
    objective: "Make every change pass the same automated checks before it is packaged and deployed, so quality and security issues surface in the pipeline rather than after release.",
    flow: { nodes: ["Git commit", "Jenkins", "Maven build", "SonarQube", "Trivy", "Nexus", "Kubernetes"], note: "Typical stage order for these tools; the repository's Jenkinsfile has the exact stages.", variant: "pipeline" },
    primer: [
      { heading: "What each gate checks", body: "SonarQube analyses source code for bugs, code smells and security hotspots and can fail the build on a quality gate. Trivy matches dependencies and image contents against vulnerability databases. They look at different things, so a pipeline can use both." },
      { heading: "Why an artifact repository", body: "Nexus keeps versioned build outputs so a deployment can use exactly the artifact that was tested, instead of rebuilding from source at deploy time." },
    ],
    related: ["retail-store-microservices", "kops-kubernetes-aws"],
  },
  {
    id: "kops-kubernetes-aws", num: "03",
    title: "Kubernetes Infrastructure with kops",
    summary: "A Kubernetes cluster provisioned on AWS with kops, using S3 for cluster state, IAM for access and Route 53 for DNS.",
    type: "Cloud infrastructure", tags: ["AWS", "Kubernetes"],
    tech: [
      { name: "kops", role: "Creates and manages the cluster on AWS" },
      { name: "AWS S3", role: "kops state store" },
      { name: "AWS IAM", role: "Permissions for kops and cluster nodes" },
      { name: "Route 53", role: "DNS for the cluster API" },
      { name: "Kubernetes", role: "The cluster being provisioned" },
    ],
    repo: gh("k8s-cluster-kops-aws"),
    overview: "Provisions a self-managed Kubernetes cluster on AWS with kops rather than a managed service, covering state storage, networking, node configuration, cluster access and deploying a workload to verify it.",
    objective: "Understand what a cluster is made of by creating one explicitly: the state store, the DNS records, the instances and the credentials that tie them together.",
    flow: { nodes: ["kops CLI", "S3 state store", "AWS EC2 and VPC", "Kubernetes cluster", "kubectl"], note: "Conceptual flow from the project scope; the repository has the exact configuration.", variant: "tiers" },
    primer: [
      { heading: "The state store", body: "kops writes the desired cluster specification to an S3 bucket. The cluster is then created and updated by reconciling AWS resources against that specification, which is why the bucket is central and why the IAM user running kops needs access to it." },
      { heading: "Why DNS matters", body: "Nodes and kubectl reach the API server through a DNS name. Route 53 records for that name must resolve correctly before a new cluster becomes usable." },
    ],
    related: ["aws-ebs-csi-storage", "kubernetes-ingress-networking"],
  },
  {
    id: "aws-ebs-csi-storage", num: "04",
    title: "AWS EBS CSI Persistent Storage",
    summary: "Persistent storage for Kubernetes workloads backed by AWS EBS through the CSI driver, with IAM permissions for volume management.",
    type: "Cloud storage", tags: ["AWS", "Kubernetes"],
    tech: [
      { name: "Kubernetes", role: "PVC, PV and StorageClass resources" },
      { name: "AWS EBS", role: "Block storage behind the volumes" },
      { name: "EBS CSI driver", role: "Creates and attaches EBS volumes on request" },
      { name: "AWS IAM", role: "Lets the driver call EC2 volume APIs" },
    ],
    repo: gh("aws-ebs-csi-persistent-storage"),
    overview: "Connects Kubernetes storage objects to AWS EBS so a pod's data can outlive the pod, using the EBS CSI driver and the IAM permissions it needs.",
    objective: "Understand how a PersistentVolumeClaim becomes a real EBS volume, and what has to be in place (driver, StorageClass, IAM) for that to work.",
    flow: { nodes: ["Pod", "PVC", "StorageClass", "EBS CSI driver", "AWS API (IAM)", "EBS volume"], note: "Conceptual flow from the project scope; the repository has the exact configuration.", variant: "pipeline" },
    primer: [
      { heading: "PVC, PV and StorageClass", body: "A pod asks for storage with a PersistentVolumeClaim. The StorageClass names the provisioner (the CSI driver) and its parameters. The driver creates the volume and a PersistentVolume object bound to the claim." },
      { heading: "Why IAM is involved", body: "The driver runs inside the cluster but creates, attaches and deletes volumes through AWS APIs. It needs IAM permissions for those calls, granted to the nodes or to the driver's service account." },
      { heading: "A constraint worth knowing", body: "An EBS volume exists in one availability zone, so a pod using it can only be scheduled onto a node in that zone." },
    ],
    related: ["kops-kubernetes-aws", "retail-store-microservices"],
  },
  {
    id: "kubernetes-ingress-networking", num: "05",
    title: "Kubernetes Ingress Networking",
    summary: "How external requests reach workloads: NGINX Ingress rules, Services, DNS and AWS networking.",
    type: "Networking", tags: ["Kubernetes", "AWS"],
    tech: [
      { name: "NGINX Ingress", role: "Controller that applies Ingress rules" },
      { name: "Kubernetes Services", role: "Stable endpoints for pods" },
      { name: "DNS", role: "Maps hostnames to the entry point" },
      { name: "AWS networking", role: "Load balancer and network path into the cluster" },
    ],
    repo: gh("k8s-networking-ingress-nginx"),
    overview: "Documents the path an external HTTP request takes into a cluster: DNS, a cloud load balancer, the NGINX Ingress controller, a Service and finally a pod.",
    objective: "Be able to explain and debug each hop in that path, and configure host-based or path-based routing with Ingress resources.",
    flow: { nodes: ["Client", "DNS", "AWS load balancer", "NGINX Ingress controller", "Service", "Pods"], note: "Conceptual flow from the project scope; the repository has the exact configuration.", variant: "layers" },
    primer: [
      { heading: "Ingress is rules, the controller does the work", body: "An Ingress resource only declares routing rules. The NGINX Ingress controller watches those resources and configures NGINX accordingly. Without a controller, an Ingress does nothing." },
      { heading: "Where requests are matched", body: "The controller matches the Host header and URL path to a rule, then forwards to the named Service, which load-balances across ready pods. A wrong Service name or failing readiness checks typically shows up as a 404 or 502 at the Ingress." },
    ],
    related: ["retail-store-microservices", "kops-kubernetes-aws"],
  },
  {
    id: "dockerized-three-tier-app", num: "06",
    title: "Dockerised Three-Tier Application",
    summary: "A Flask application with MariaDB and an NGINX reverse proxy, run as separate containers with Docker Compose on EC2.",
    type: "Containers", tags: ["Containers", "AWS"],
    tech: [
      { name: "Docker", role: "Container images" },
      { name: "Docker Compose", role: "Defines and starts the three services together" },
      { name: "Flask", role: "Application tier" },
      { name: "MariaDB", role: "Database tier" },
      { name: "NGINX", role: "Reverse proxy in front of the app" },
      { name: "AWS EC2", role: "Host running the stack" },
    ],
    repo: gh("dockerized-three-tier-app"),
    overview: "Runs a web tier, an application tier and a database tier as three containers on one EC2 host, connected by a Compose network, with database data kept on a volume.",
    objective: "Practise splitting an application into tiers, letting containers reach each other by service name and keeping data when containers are replaced.",
    flow: { nodes: ["Browser", "NGINX", "Flask", "MariaDB", "Volume"], note: "Conceptual flow from the project scope; the repository has the exact configuration.", variant: "tiers" },
    primer: [
      { heading: "Networking in Compose", body: "Compose puts the services on a shared network where each service name resolves as a hostname, so Flask can reach the database at its service name rather than an IP." },
      { heading: "Persistence", body: "A container's filesystem is discarded with the container. Storing the database directory on a volume keeps the data when the container is recreated." },
      { heading: "Why a reverse proxy", body: "NGINX terminates incoming connections and forwards requests to the Flask container, so only the proxy needs to be exposed on the host." },
    ],
    related: ["retail-store-microservices", "jenkins-cicd-pipeline"],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
export const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
