import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { electronService } from '../../electron.service';
import './LogBox.css'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
const { logger } = electronService;

const classPerType = {
  error: 'Text--Error',
  important: 'Text--Rare',
  currency: 'Text--Legendary'
};

const Line = ({ messages, timestamp }) => {
  const formattedMessages = messages.map(({type, text, link}) => {
    const Element = type ? <span className={classPerType[type]}>{text}</span> : <>{text}</>
    return link ? <Link to={link} style={{fontSize: 'inherit'}}>{Element}</Link> : <>{Element}</>;
  });
  const time = timestamp.format('YYYY-MM-DD HH:mm:ss');
  return <div className="Log-Box__Line"><span className="Text--Legendary--2">[{time}] </span>{formattedMessages}</div>
};

const LogBox = ({ store }) => {
  const messages = store.logs.map(({ id, messages, timestamp }) => <Line key={`Log-${id}`} timestamp={timestamp} messages={messages} />);
  const [isOpen, toggleOpenState] = useState(false);
  const classes = classNames({
    'Log-Box': true,
    'Log-Box--Open': isOpen
  });
  const icon = isOpen ? <CloseFullscreenIcon fontSize='small' className='Log-Box__Icon' onClick={() => toggleOpenState(false)}/> : <OpenInFullIcon fontSize='small' className='Log-Box__Icon' onClick={() => toggleOpenState(true)} />;

  return (
    <div className={classes}>
      {icon}
      <div className='Log-Box__Lines'>
        <div className="Log-Box__Old_Lines">{messages.slice(0, -1)}</div>
        <div className="Log-Box__Last_Line">{messages.slice(-1)}</div>
      </div>
    </div>
  );
};

export default observer(LogBox);