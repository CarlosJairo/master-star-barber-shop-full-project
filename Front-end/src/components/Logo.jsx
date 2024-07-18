import LogoMSBS from "../assets/img/logo.png";

const Logo = ({ className }) => {
  return (
    <img
      src={LogoMSBS}
      alt="Logo"
      className={`logo ${className && className}`}
    />
  );
};

export default Logo;
