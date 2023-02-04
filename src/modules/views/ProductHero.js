import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ArrowDownwardIcon } from "@material-ui/icons";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import TimeInput from './TimeInput';
import TimestampInput from './NumberInput';

import TextField from "@material-ui/core/TextField";

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

  text_container: {
    width:'30%' // default
  },  
});

function ProductHero(props) {
  const { classes } = props;
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
      
      <Typography color="inherit"  align="left" variant="h3">
        유닉스 타임스탬프란?
      </Typography>
      <br />

      <Typography style={{width:'70%'}} color="inherit" align="center" variant="h6" marked="center">
        유닉스 타임스탬프 (unix timestamp or epoch timestamp)는 1970년 1월 1일 00:00:00 협정 세계시(UTC) 부터의 경과 시간을 초로 환산하여 표현됩니다. 이 타임스탬프는 디스코드 타임스탬프에 활용할 수 있습니다.  
      </Typography> <span>{'<t:'+timestamp+'>'}</span>
      <br />
      <br />
      <br />
      <img style={{ display: "none" }} src={backgroundImage} alt="" />
      <TimeInput now={now} handleUpdate={handleDateUpdate}/>
      <br />

      <Typography color="inherit" align="center" variant="h4" marked="center">
      <span style={{ color: 'white' }}>{convertText}</span>: <span style={{ color: 'yellow' }}>{timestamp}</span>
      </Typography>
      <br />
      <br />
      <br />

      <TimestampInput  now={now} handleUpdate={handleTimeStampUpdate}></TimestampInput>
      <Typography color="inherit" align="center" variant="h4" marked="center">
      <span style={{ color: 'white' }}>{convertDateText}</span>: <span style={{ color: 'yellow' }}>{date.toLocaleString()}</span>
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
