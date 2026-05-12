import { components } from "./components/custom";
import { createProcessor } from "./utils/processor";

interface TiptapRendererProps {
  children: string;
  className?: string;
}

const TiptapRenderer = ({ children, className = "" }: TiptapRendererProps) => {
  const processor = createProcessor({ components });
  const processed = processor.processSync(children);
  return (
    <div className={`rte-content ${className}`.trim()}>
      {processed.result}
    </div>
  );
};

export default TiptapRenderer;
