import React from "react";
import SkeletonText from "../../src/components/SkeletonText";
import ButtonSkeleton from "../../src/components/Button/Button.Skeleton";
import useSettings from "../../src/hooks/useSettings";

const FileUploaderSkeleton = () => {
  const { prefix } = useSettings();
  return (
    <div className={`${prefix}--form-item`}>
      <SkeletonText heading width="100px" />
      <SkeletonText width="225px" className={`${prefix}--label-description`} />
      <ButtonSkeleton />
    </div>
  );
};

export default FileUploaderSkeleton;
