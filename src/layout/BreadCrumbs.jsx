import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './AppLayout.scss';

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumbs-section">
      <Breadcrumbs
        separator={<FontAwesomeIcon icon={faChevronRight} />}
        aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          key="1"
          color="inherit"
          href="/"
          to="/"
        >
          Home
        </Link>
        {pathnames.map((value, index) => {
          // const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return isLast ? (
            <Typography key={index} color="text.primary" style={{textTransform: "capitalize"}}>
                {value}
              </Typography>
          ) : (
              <Typography key={index} style={{textTransform: "capitalize"}}>
                {value}
              </Typography>
          );
        })}
        {/* <Typography key="3" color="text.primary">
          Gallery
        </Typography> */}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
