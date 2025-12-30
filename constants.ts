import { InnovationMethod, TechniqueDef } from './types';

export const TECHNIQUES: TechniqueDef[] = [
  {
    id: InnovationMethod.VISUAL_PROTOTYPING,
    name: "Visual Prototyping",
    description: "Edit images using AI to visualize changes. Upload an image and describe the edit.",
    icon: "Image",
    color: "bg-fuchsia-600",
    promptTemplate: "{problem}"
  },
  {
    id: InnovationMethod.TRIZ,
    name: "TRIZ",
    description: "Theory of Inventive Problem Solving. Resolves contradictions using 40 inventive principles.",
    icon: "Layers",
    color: "bg-blue-500",
    promptTemplate: `You are an expert in TRIZ (Theory of Inventive Problem Solving). 
    Analyze the following problem: "{problem}".
    1. Identify the core technical or physical contradictions in this problem.
    2. Consult the Contradiction Matrix concepts.
    3. Suggest 3-5 specific Inventive Principles (from the 40 Principles) that could solve this.
    4. Provide concrete application examples for each principle related to the user's problem.`
  },
  {
    id: InnovationMethod.SCAMPER,
    name: "SCAMPER",
    description: "Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse.",
    icon: "RefreshCw",
    color: "bg-green-500",
    promptTemplate: `You are a creative facilitator using the SCAMPER method.
    The problem is: "{problem}".
    Generate distinct questions and solution ideas for EACH letter of SCAMPER:
    - **S**ubstitute: What can be replaced?
    - **C**ombine: What can be merged?
    - **A**dapt: What can be added or tweaked?
    - **M**odify: What can be changed in scale or shape?
    - **P**ut to other use: Who else can use it?
    - **E**liminate: What is unnecessary?
    - **R**everse: What if we do the opposite?`
  },
  {
    id: InnovationMethod.SIX_HATS,
    name: "Six Thinking Hats",
    description: "Explore the problem from six distinct perspectives: Logic, Emotion, Caution, Optimism, Creativity, and Control.",
    icon: "Hexagon",
    color: "bg-indigo-500",
    promptTemplate: `You are facilitating a Six Thinking Hats session.
    Analyze the problem "{problem}" by wearing each hat effectively.
    Output the analysis in this structure:
    *   **White Hat (Facts):** Data, information, knowns/unknowns.
    *   **Red Hat (Emotions):** Gut feelings, intuition, reactions (no justification needed).
    *   **Black Hat (Caution):** Risks, difficulties, why it might not work.
    *   **Yellow Hat (Optimism):** Benefits, value, positives.
    *   **Green Hat (Creativity):** Alternatives, new ideas, possibilities.
    *   **Blue Hat (Process):** Conclusion, next steps, action plan.`
  },
  {
    id: InnovationMethod.FIVE_WHYS,
    name: "The 5 Whys",
    description: "Root cause analysis by repeatedly asking 'Why?' to move from symptoms to causes.",
    icon: "HelpCircle",
    color: "bg-orange-500",
    promptTemplate: `Perform a "5 Whys" root cause analysis on this problem: "{problem}".
    1. Start with the problem statement.
    2. Ask "Why?" five times iteratively, drilling down deeper into the fundamental cause each time.
    3. After finding the root cause, propose a solution that addresses the root, not just the symptom.`
  },
  {
    id: InnovationMethod.BIOMIMICRY,
    name: "Biomimicry",
    description: "Emulate nature's time-tested patterns and strategies to solve human problems.",
    icon: "Leaf",
    color: "bg-emerald-600",
    promptTemplate: `You are a Biomimicry expert.
    The problem is: "{problem}".
    1. Identify the core function the user is trying to achieve (e.g., sticking, filtering, cooling).
    2. Find 3 examples in nature (plants, animals, ecosystems) that perform this function efficiently.
    3. Explain how these biological strategies can be translated into a design or engineering solution for the user's problem.`
  },
  {
    id: InnovationMethod.SIT,
    name: "SIT (Systematic Inventive Thinking)",
    description: "Thinking inside the box using Subtraction, Task Unification, Multiplication, or Division.",
    icon: "Box",
    color: "bg-purple-600",
    promptTemplate: `Apply Systematic Inventive Thinking (SIT) to: "{problem}".
    Focus on "Thinking Inside the Box". Use the Closed World condition.
    Apply these specific tools:
    1. **Subtraction:** Remove an essential component. What happens? How does the system survive?
    2. **Task Unification:** Assign a new task to an existing component.
    3. **Multiplication:** Copy a component but change a parameter (e.g., location, temperature).
    4. **Division:** Split a component functionally or physically.`
  },
  {
    id: InnovationMethod.DESIGN_THINKING,
    name: "Design Thinking",
    description: "A human-centered approach: Empathize, Define, Ideate, Prototype, Test.",
    icon: "Users",
    color: "bg-pink-500",
    promptTemplate: `Guide the user through a rapid Design Thinking process for: "{problem}".
    1. **Empathize:** Who is the user? What are their pain points?
    2. **Define:** Create a clear Problem Statement (Point of View).
    3. **Ideate:** Generate 3 wild, divergent solution concepts.
    4. **Prototype:** Describe a low-fidelity prototype (MVP) to test one idea.
    5. **Test:** What specific questions should be asked to validate this prototype?`
  },
  {
    id: InnovationMethod.MORPHOLOGICAL,
    name: "Morphological Analysis",
    description: "Break a system into dimensions and explore all possible combinations.",
    icon: "Grid",
    color: "bg-cyan-600",
    promptTemplate: `Perform a Morphological Analysis for the problem: "{problem}".
    1. Decompose the system/problem into 3-4 key dimensions or parameters (e.g., Material, Power Source, Control Method).
    2. List 3-4 possible attributes/values for each dimension.
    3. Create a Markdown table representing this matrix.
    4. "Force fit" three distinct combinations from the matrix to create unique, novel solution concepts.`
  },
  {
    id: InnovationMethod.ANALOGICAL,
    name: "Analogical Reasoning",
    description: "Solve problems by finding similarities in distant domains.",
    icon: "Cpu",
    color: "bg-amber-500",
    promptTemplate: `Use Analogical Reasoning to solve: "{problem}".
    1. Abstract the problem to its structural core (ignoring surface details).
    2. Identify a completely different domain (e.g., astronomy, military, cooking, software) that has a structurally similar problem.
    3. Describe the solution in that source domain.
    4. Map that solution back to the target problem to generate a novel idea.`
  },
  {
    id: InnovationMethod.SYNECTICS,
    name: "Synectics",
    description: "Make the familiar strange and the strange familiar using metaphors.",
    icon: "Zap",
    color: "bg-violet-600",
    promptTemplate: `Apply Synectics to the problem: "{problem}".
    Use the following analogies to stretch thinking:
    1. **Direct Analogy:** How is this problem like a biological or mechanical process?
    2. **Personal Analogy:** Imagine YOU are the object/component being analyzed. How do you feel? What hurts?
    3. **Symbolic Analogy:** Create a two-word "Book Title" for the problem that contains a contradiction (e.g., "Safe Danger").
    4. **Fantasy Analogy:** How would this be solved in a magical world with no physics constraints?
    5. Translate these insights into practical solutions.`
  }
];