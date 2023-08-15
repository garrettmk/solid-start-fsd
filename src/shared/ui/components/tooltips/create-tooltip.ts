import { createEffect } from "solid-js";
import { FloatingUIOptions, createFloatingUI } from "../../helpers";


export function createTooltip(options?: FloatingUIOptions) {
  const tooltip = createFloatingUI({
    placement: 'top',
    offset: { mainAxis: 4 },
    ...options
  });

  createEffect(() => {
    let timeout: NodeJS.Timeout;
    const opener = () => {
      timeout = setTimeout(tooltip.open, 500);
    };

    const closer = () => {
      clearTimeout(timeout);
      tooltip.close();
    };

    tooltip.anchorEl()?.addEventListener('mouseenter', opener);
    tooltip.anchorEl()?.addEventListener('mouseleave', closer);

    return () => {
      tooltip.anchorEl()?.removeEventListener('mouseenter', opener);
      tooltip.anchorEl()?.removeEventListener('mouseleave', closer);
    }
  });

  return tooltip;
}