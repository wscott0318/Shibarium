import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export default function ArrowTooltips({text, tooltipText}: {text: any, tooltipText: any}) {
  return (
    <Tooltip placement="right-start" title={tooltipText}arrow>
      <p>{text}</p>
    </Tooltip>
  );
}
