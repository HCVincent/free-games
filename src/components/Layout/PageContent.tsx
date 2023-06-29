import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = { children: React.ReactNode };

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <div className="w-full h-screen justify-center">
      <div className="flex w-full h-full justify-center">
        <div className="w-1/5">
          {children && children[0 as keyof typeof children]}
        </div>
        <div className="flex flex-1">
          {children && children[1 as keyof typeof children]}
        </div>
      </div>
    </div>
  );
};
export default PageContent;
