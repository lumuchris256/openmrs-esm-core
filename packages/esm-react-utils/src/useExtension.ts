import { RefObject, useContext, useRef, useEffect } from "react";
import { renderExtension } from "@openmrs/esm-extensions";
import { ComponentContext, ExtensionData } from "./ComponentContext";

export function useExtension<TRef extends HTMLElement>(
  state?: Record<string, any>
): [RefObject<TRef>, ExtensionData | undefined] {
  const ref = useRef<TRef>(null);
  const { extension } = useContext(ComponentContext);

  useEffect(() => {
    if (ref.current && extension) {
      return renderExtension(
        ref.current,
        extension.actualExtensionSlotName,
        extension.attachedExtensionSlotName,
        extension.extensionSlotModuleName,
        extension.extensionId,
        undefined,
        state
      );
    }
  }, [
    extension?.actualExtensionSlotName,
    extension?.attachedExtensionSlotName,
    extension?.extensionId,
    extension?.extensionSlotModuleName,
    ref.current,
    state,
  ]);

  return [ref, extension];
}
