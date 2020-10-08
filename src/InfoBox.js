import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function infoBox({ title, cases, recovered, fatal }) {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          <Typography className="infoBox_title" color="textSecondary">
            {title}
          </Typography>

          <h2 className="infoBox_cases"> + {cases}</h2>

          <Typography className="infoBox_recovered" color="textSecondary">
            {recovered}
          </Typography>
          <Typography className="infoBox_fatal" color="textSecondary">
            {fatal} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default infoBox;
