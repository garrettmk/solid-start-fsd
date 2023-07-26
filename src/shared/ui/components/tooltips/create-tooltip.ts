import { createEffect } from "solid-js";
import { FloatingUIOptions, createFloatingUI } from "../../helpers";


export function createTooltip(options?: FloatingUIOptions) {
  const tooltip = createFloatingUI({
    placement: 'top',
    offset: { mainAxis: 4 },
    ...options
  });

  createEffect(() => {
    tooltip.anchorEl()?.addEventListener('mouseover', tooltip.open);
    tooltip.anchorEl()?.addEventListener('mouseleave', tooltip.close);

    return () => {
      tooltip.anchorEl()?.removeEventListener('mouseover', tooltip.open);
      tooltip.anchorEl()?.removeEventListener('mouseleave', tooltip.close);
    }
  });

  return tooltip;
}
