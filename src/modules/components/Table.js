

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

 const useStyles = makeStyles( theme =>({
    table: {
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
  cell:{
    [theme.breakpoints.down('321')]: { // mobile breakpoint
      fontSize: "15px"
    },
    [theme.breakpoints.up('322')]: { // mobile breakpoint
      fontSize: "15px"  },
    [theme.breakpoints.up('501')]: { // desktop breakpoint and above 
      fontSize: "15px"  } 
  }
}));

 const MaterialUITable = (props_) => {

  const classes = useStyles();
  var timestamp = props_.timestamp;
  var date = new Date(timestamp*1000);
  var now = new Date();


  var units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  }
  
  var rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })
  var getRelativeTime = (d1, d2 = new Date()) => {
    var elapsed = d1 - d2
  
    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units) 
      if (Math.abs(elapsed) > units[u] || u == 'second') 
        return rtf.format(Math.round(elapsed/units[u]), u)
  }
  
  // test-list of dates to compare with current date
  [
    '10/20/1984',
    '10/20/2015',
    +new Date() - units.year,
    +new Date() - units.month,
    +new Date() - units.day,
    +new Date() - units.hour,
    +new Date() - units.minute,
    +new Date() + units.minute*2,
    +new Date() + units.day*7,
  ]
  .forEach(d => console.log(   
    new Date(d).toLocaleDateString(),
    new Date(d).toLocaleTimeString(), 
    '(Relative to now) →',
    getRelativeTime(+new Date(d))
  ))


  console.log('date', date.toLocaleString());
    var props = {
        columns: [
            { id: 'markdown', label: 'Markdown' },
            { id: 'show', label: 'Show' },
            // { id: 'icon', label: 'Icon' }
          ], 
          rows: [
            { markdown: `<t:${timestamp}:F>`, show:  date.toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}, 
            { markdown: `<t:${timestamp}:f>`, show: date.toLocaleString( undefined, {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })},
            { markdown: `<t:${timestamp}:D>`, show: date.toLocaleString(undefined, {month: 'long', day: 'numeric', year: 'numeric', })},
            { markdown: `<t:${timestamp}:d>`, show: date.toLocaleDateString()},
            { markdown: `<t:${timestamp}:t>`, show: date.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric' }),},
            { markdown: `<t:${timestamp}:T>`, show: date.toLocaleTimeString(),},
            { markdown: `<t:${timestamp}:R>`, show: getRelativeTime(date, now)},
          ]
    }
  return (
    <Table className={classes.table} aria-label="simple table">
    <TableBody>
    {props.rows.map(row => (
    <TableRow key={row.name}>
        {props.columns.map(column => {
            const value = row[column.id];  
            console.log(column.id, value); 
            if(column.id == 'markdown') {
              return (<TableCell key={column.id} align="left"> 
              <span style={{backgroundColor: 'black', color: 'white'}}>{value}</span> 
              </TableCell>);
            }
            else {
              return (<TableCell key={column.id} align="left"> 
              <span className={classes.cell} style={{color: "white", fontWeight: "bold"}}>{value}</span> 
              </TableCell>);
            }
        })}
    </TableRow>))}
    </TableBody>
    </Table>
    );
  }
  
  export default MaterialUITable;