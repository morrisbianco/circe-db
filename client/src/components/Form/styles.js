import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dropdown: {
    width: '94%',
    marginBottom: '10px',
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
    backgroundColor: 'rgb(106,11,11)',
  },
}));