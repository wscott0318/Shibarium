import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TriggerExample({tooltipText, renderText}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 100, hide: 400 }}
      overlay={renderTooltip}
    >
      {renderText()}
    </OverlayTrigger>
  );
}

export default TriggerExample;