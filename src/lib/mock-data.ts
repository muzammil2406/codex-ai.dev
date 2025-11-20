export interface RepoMetadata {
  repoName: string;
  repoUrl: string;
  description: string;
  languages: { name: string; percentage: number; color: string }[];
  totalFiles: number;
  lastAnalyzed: string;
}

export interface FileNode {
  type: 'file' | 'folder';
  name: string;
  path: string;
  children?: FileNode[];
  content?: string;
  language?: string;
}

export interface TechDebtMetrics {
  overallScore: number;
  complexity: number;
  duplication: number;
  testCoverage: number;
  outdatedDependencies: number;
}

export interface DeadCodeItem {
  file: string;
  functionName?: string;
  confidence: number;
  lines: string;
}

export interface GitHistoryPoint {
  month: string;
  commits: number;
  locAdded: number;
  locDeleted: number;
  activeContributors: number;
}

export interface Contributor {
  name: string;
  avatarUrl: string;
  commits: number;
  locAdded: number;
  locDeleted: number;
  filesTouched: number;
}

export interface AnalysisResult {
  story: string;
  fileTree: FileNode;
  techDebt: TechDebtMetrics;
  deadCode: DeadCodeItem[];
  dependencies: { name: string, version: string, type: 'direct' | 'indirect' }[];
  gitHistory: GitHistoryPoint[];
  contributors: Contributor[];
}

export const repoMetadata: RepoMetadata = {
  repoName: 'facebook/react',
  repoUrl: 'https://github.com/facebook/react',
  description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
  languages: [
    { name: 'JavaScript', percentage: 75, color: 'bg-yellow-400' },
    { name: 'HTML', percentage: 15, color: 'bg-orange-500' },
    { name: 'CSS', percentage: 5, color: 'bg-blue-500' },
    { name: 'Other', percentage: 5, color: 'bg-gray-400' },
  ],
  totalFiles: 2345,
  lastAnalyzed: new Date().toLocaleDateString(),
};

export const analysisResult: AnalysisResult = {
  story: `
### The Genesis of a UI Revolution

In the early days of Facebook, managing the complexities of a dynamic, stateful user interface was becoming a monumental challenge. The existing MVC patterns were leading to a tangled mess of data flows and unpredictable side effects. From this chaos, an idea was born: a library that treated UI as a simple function of state. In 2013, Jordan Walke unveiled an early prototype of what would become React. It introduced a radical concept: the Virtual DOM. Instead of directly manipulating the browser's DOM, React would create a lightweight in-memory representation, compute the minimal set of changes, and efficiently update the actual DOM. This declarative approach—describing *what* the UI should look like for any given state—was a paradigm shift.

### From Component Architecture to Hooks

The initial architecture centered around class components with lifecycle methods like \`componentDidMount\` and \`componentDidUpdate\`. This provided structure but could lead to "wrapper hell" and complex logic sharing. The community innovated with patterns like Higher-Order Components (HOCs) and Render Props, but they came with their own trade-offs.

The next major leap came in 2018 with the introduction of **Hooks**. This was arguably the most significant evolution in React's history. Hooks, like \`useState\` and \`useEffect\`, allowed developers to use state and other React features in functional components. This simplified component logic, flattened component trees, and made sharing stateful logic dramatically easier through custom Hooks. The codebase saw a massive shift away from classes, embracing a more functional and composable style.

### Concurrent Mode and the Future

Today, the React team is pushing the boundaries again with Concurrent Mode and Server Components. These are not just new features but a fundamental rethinking of rendering. Concurrent Mode allows React to work on multiple state updates "concurrently," without blocking the main thread, leading to more responsive applications. Server Components promise to further optimize performance by allowing components to render on the server, reducing the amount of JavaScript shipped to the client.

The story of React is one of continuous evolution, driven by the need to build complex, high-performance user interfaces at scale. From the Virtual DOM to Hooks to Server Components, it has consistently challenged the status quo and provided developers with more powerful and elegant tools to build for the web.
  `,
  fileTree: {
    type: 'folder',
    name: 'react',
    path: '/',
    children: [
      {
        type: 'folder',
        name: 'packages',
        path: '/packages',
        children: [
          {
            type: 'folder',
            name: 'react',
            path: '/packages/react',
            children: [
              {
                type: 'folder',
                name: 'src',
                path: '/packages/react/src',
                children: [
                  { 
                    type: 'file', 
                    name: 'React.js',
                    path: '/packages/react/src/React.js',
                    language: 'javascript',
                    content: `
import {
  useState,
  useEffect,
  useRef,
} from './ReactHooks';
import {
  createElement,
  cloneElement,
} from './ReactElement';
import {Component} from './ReactBaseClasses';

export {
  useState,
  useEffect,
  useRef,
  createElement,
  cloneElement,
  Component,
};
`
                  },
                  { 
                    type: 'file', 
                    name: 'ReactHooks.js',
                    path: '/packages/react/src/ReactHooks.js',
                    language: 'javascript',
                    content: `
let isMounted = false;
let workInProgressHook = null;
let componentHooks = [];
let hookIndex = 0;

function resolveDispatcher() {
  // Simplified for demonstration
  return {
    useState: (initialState) => {
      // Implementation of useState
      let hook = componentHooks[hookIndex];
      if (!hook) {
        hook = { state: initialState, queue: [] };
        componentHooks[hookIndex] = hook;
      }
      // ... more logic
      return [hook.state, () => {}];
    },
    useEffect: (create, deps) => {
      // Implementation of useEffect
    },
  };
}

export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useEffect(create, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
` 
                  },
                ],
              },
            ],
          },
          {
            type: 'folder',
            name: 'react-dom',
            path: '/packages/react-dom',
            children: [
              { type: 'file', name: 'index.js', path: '/packages/react-dom/index.js', content: 'console.log("react-dom");', language: 'javascript' },
            ],
          }
        ],
      },
      {
        type: 'folder',
        name: 'scripts',
        path: '/scripts',
        children: [
          { type: 'file', name: 'build.js', path: '/scripts/build.js', content: '// Build script for React', language: 'javascript' },
        ],
      },
      { type: 'file', name: 'README.md', path: '/README.md', content: '# React', language: 'markdown' },
    ],
  },
  techDebt: {
    overallScore: 78,
    complexity: 65,
    duplication: 80,
    testCoverage: 85,
    outdatedDependencies: 90,
  },
  deadCode: [
    { file: 'src/legacy/utils/OldHelper.js', functionName: 'calculateLegacyValue', confidence: 95, lines: '42-58' },
    { file: 'src/components/unused/DeprecatedButton.js', confidence: 99, lines: '1-150' },
    { file: 'src/experimental/api/v1/feature.js', functionName: 'doSomethingExperimental', confidence: 88, lines: '12-25' },
  ],
  dependencies: [
    { name: 'scheduler', version: '0.23.0', type: 'direct' },
    { name: 'loose-envify', version: '1.4.0', type: 'direct' },
    { name: 'object-assign', version: '4.1.1', type: 'indirect' },
  ],
  gitHistory: [
    { month: 'Jan 2023', commits: 120, locAdded: 15000, locDeleted: 4000, activeContributors: 25 },
    { month: 'Feb 2023', commits: 135, locAdded: 18000, locDeleted: 5500, activeContributors: 28 },
    { month: 'Mar 2023', commits: 150, locAdded: 22000, locDeleted: 7000, activeContributors: 32 },
    { month: 'Apr 2023', commits: 110, locAdded: 13000, locDeleted: 3000, activeContributors: 26 },
    { month: 'May 2023', commits: 160, locAdded: 25000, locDeleted: 8000, activeContributors: 35 },
    { month: 'Jun 2023', commits: 140, locAdded: 19000, locDeleted: 6000, activeContributors: 30 },
    { month: 'Jul 2023', commits: 175, locAdded: 28000, locDeleted: 9500, activeContributors: 38 },
    { month: 'Aug 2023', commits: 130, locAdded: 17000, locDeleted: 5000, activeContributors: 29 },
    { month: 'Sep 2023', commits: 155, locAdded: 23000, locDeleted: 7500, activeContributors: 33 },
    { month: 'Oct 2023', commits: 165, locAdded: 26000, locDeleted: 8500, activeContributors: 36 },
    { month: 'Nov 2023', commits: 180, locAdded: 30000, locDeleted: 10000, activeContributors: 40 },
    { month: 'Dec 2023', commits: 190, locAdded: 32000, locDeleted: 11000, activeContributors: 42 },
  ],
  contributors: [
    { name: 'Dan Abramov', avatarUrl: 'https://picsum.photos/seed/dan/48/48', commits: 1250, locAdded: 350000, locDeleted: 120000, filesTouched: 800 },
    { name: 'Andrew Clark', avatarUrl: 'https://picsum.photos/seed/andrew/48/48', commits: 980, locAdded: 280000, locDeleted: 95000, filesTouched: 650 },
    { name: 'Sophie Alpert', avatarUrl: 'https://picsum.photos/seed/sophie/48/48', commits: 750, locAdded: 190000, locDeleted: 70000, filesTouched: 500 },
    { name: 'Sebastian Markbåge', avatarUrl: 'https://picsum.photos/seed/sebastian/48/48', commits: 1500, locAdded: 450000, locDeleted: 180000, filesTouched: 1100 },
    { name: 'Brian Vaughn', avatarUrl: 'https://picsum.photos/seed/brian/48/48', commits: 600, locAdded: 150000, locDeleted: 50000, filesTouched: 400 },
  ]
};
