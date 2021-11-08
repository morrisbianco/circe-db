import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  overlay3: {
    bottom: '20px',
    right: '20px',
    color: 'white',
  },
  overlay4: {
    bottom: '20px',
    left: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    paddingTop: '1rem',
  },
  subtitle: {
    right: '500px',
    top: '17px',
  },
  format: {
    right: '20px',
    top: '80px',
    position: 'absolute',
    fontWeight: 'bold',
  },
  view: {
    padding: '0 16px',
    right: '20px',
    position: 'absolute',
    top: '20px',
    color: 'white',
    backgroundColor: 'rgb(106,11,11)',
  },
  show: {
    
  },
  hide: {
    display: 'none',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});