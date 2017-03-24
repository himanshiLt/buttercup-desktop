import { connect } from 'react-redux';
import FileOpener from '../components/file-opener';
import { openArchive, newArchive } from '../../shared/actions/files'; 

export default connect(
  null,
  {
    onOpenClick: openArchive,
    onNewClick: newArchive  
  }
)(FileOpener);
