import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { List, ListItem, ListItemSecondaryAction, Radio } from '@mui/material';


const style = {
    position: 'absolute',
    display : 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Avatar() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedValue, setSelectedValue] = React.useState(0);
    const [checked, setChecked] = React.useState([1]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

  return (
    <div>
          <Card sx={{ maxWidth: 345, margin : 10 }}>
      <CardMedia
        sx={{ height: 400 }}
        componenet = "img"
        alt = "User Avatar"
        image={`/avatars/${selectedValue}.png`}
        title="User Avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Username
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User Info!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color ="primary" onClick={handleOpen}>Change Avatar</Button>
      </CardActions>
    </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <List dense>
      {[1, 2, 3, 4, 5, 6,7,8].map((key) => {
        const labelId = `checkbox-list-secondary-label-${key}`;
        return (
          <ListItem key={key} button>
              <CardMedia
              style = {{maxWidth: 100}}
              component="img"
              alt={`Avatar n°${key}`}
              image={`/avatars/${key}.png`}
              title="User Avatar"
              />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                value= {key}
                onChange={handleChange}
                checked={""+selectedValue === ""+key}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List></Box>
    </Modal>

    </div>
  
  );
}

export default Avatar;