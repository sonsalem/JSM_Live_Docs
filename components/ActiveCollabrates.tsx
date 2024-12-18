import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ActiveCollaborators = () => {
  const others = useOthers();

  const collaborators = others.map((other) => other.info);

  console.log(collaborators);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src={avatar}
                  alt={name}
                  width={75}
                  height={75}
                  className={`inline-block size-8 rounded-full ring-2 ring-dark-100 cursor-pointer`}
                  style={{ border: `3px solid ${color}` }}
                />
              </TooltipTrigger>
              <TooltipContent className="text-xs shadow-sm bg-dark-200 !border-dark-300 text-blue-100">
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
