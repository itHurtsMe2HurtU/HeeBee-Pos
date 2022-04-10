import React from "react";
import Load from "../../assets/images/loader-1.gif";
import "./Loader.css";
import { connect } from "react-redux";
const Loader = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={Load} alt="Loader" />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.orderList.loading,
});
export default connect(mapStateToProps)(Loader);
