import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import TimeInput from './TimeInput';
import TimestampInput from './NumberInput';
import Table from '../components/Table';
import { makeStyles } from "@material-ui/core/styles";

const backgroundImage =
  "https://res.cloudinary.com/dnguyen/image/upload/ar_16:9,b_rgb:7c7979,c_fill,e_oil_paint:0,g_auto,z_1.2/v1567927617/namphuong/background_kcopck.jpg";

const styles = theme => ({
  background: {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  // h5: {
  //   marginBottom: theme.spacing(4),
  //   marginTop: theme.spacing(4),
  //   [theme.breakpoints.up("sm")]: {
  //     marginTop: theme.spacing(10)
  //   }
  // },
  more: {
    marginTop: theme.spacing(2)
  },
});

const useStyles = makeStyles(theme => ({
  text_container: {

    [theme.breakpoints.down('321')]: { // mobile breakpoint
      width:'80%', // override for mobile 
    },
    [theme.breakpoints.up('322')]: { // mobile breakpoint
      width:'70%', // override for mobile 
    },
    [theme.breakpoints.up('501')]: { // desktop breakpoint and above 
      width:'60%', // default value 
    } 
  },  
}));

function ProductHero(props) {
  const { classes } = props;
  const classes_ = useStyles();

  const [now, setNow] = React.useState(new Date());
  const [timestamp, setTimeStamp]= React.useState(0);
  const [date, setDate]= React.useState(0);

  var convertText = 'Timestamp'
  var convertDateText = 'Date'

  const handleDateUpdate = (time) =>{
    console.log('handle update', time);
    let unixTimestamp = new Date(time).getTime() / 1000;
    setTimeStamp(unixTimestamp);
  }

  const handleTimeStampUpdate = (time)=>{
    // console.log('handleTimeStampUpdate', time, new Date(time));
    var date_ = new Date(time*1000);
    setDate(date_);
  }

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      
      <Typography color="inherit"  align="center" variant="h4">
      디스코드 시간 변환기
      </Typography>
      <br />

      <Typography className={classes_.text_container} color="inherit" align="center" variant="h6" marked="center"> 사용자의 현지시간을 표시하는 마크다운 텍스트를 만듭니다. 시간을 입력하고 아래 마크다운을 Discord에 복사하세요.
      </Typography>
      <br />
      <br />
      <br />
      <img style={{ display: "none" }} src={backgroundImage} alt="" />
      <TimeInput now={now} handleUpdate={handleDateUpdate}/>
      <br />

      <Typography color="inherit" align="center" variant="h4" marked="center">
      <span style={{ color: 'white' }}>{convertText}</span>: <span style={{ color: 'yellow' }}>{timestamp}</span>
      </Typography>

      <Table timestamp={timestamp}></Table>





    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
