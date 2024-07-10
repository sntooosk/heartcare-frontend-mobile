import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";

import LogoSvg from "../../assets/svg/logo.svg";
import { useTheme } from "../../context/ThemeContext";
import ResetPasswordForm from "../components/ResetPassword";
import ResetPasswordForm2 from "../components/ResetPassword2";
import ResetPasswordForm3 from "../components/ResetPassword3";
import { changePassword } from "../../api/requests/auth/changePassword";
import { verifyMail } from "../../api/requests/auth/verifyMail";
import { verifyOtp } from "../../api/requests/auth/verifyOtp";
import ChangePassword from "../../models/dto/ChangePasswordDTO";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/types";

function ResetPassword() {
  const { theme } = useTheme();
  const { navigate } = useNavigation<propsStack>();

  const [resetEmail, setResetEmail] = useState("");
  const [codigoOtp, setCodigoOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(true);
  const [showResetPassword2, setShowResetPassword2] = useState(false);
  const [showResetPassword3, setShowResetPassword3] = useState(false);
  const [mudarPassword, setMudarPassword] = useState("");
  const [mudarPasswordConf, setMudarPasswordConf] = useState("");

  const handleEnvioCodigoOtp = async () => {
    try {
      setLoading(true);
      const response = await verifyMail(resetEmail);
      if (response.status === "OK") {
        setShowResetPassword(false);
        setShowResetPassword2(true);
      } else {
        Alert.alert(response.message || "Erro ao enviar código OTP.");
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      Alert.alert("Erro ao enviar código OTP. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnvioCodigoOtp2 = async () => {
    try {
      setLoading(true);
      const response = await verifyMail(resetEmail);
      if (response.status === "OK") {
        setShowResetPassword(false);
        setShowResetPassword2(true);
      } else {
        Alert.alert(response.message || "Erro ao enviar código OTP.");
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      Alert.alert("Erro ao enviar código OTP. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigoOtp = async () => {
    try {
      setLoading(true);
      const response = await verifyOtp(Number(codigoOtp), resetEmail);
      if (response.status === "OK") {
        setShowResetPassword2(false);
        setShowResetPassword3(true);
      } else {
        Alert.alert(response.message || "Erro ao verificar código OTP.");
      }
    } catch (error) {
      console.error("Erro ao verificar OTP:", error);
      Alert.alert("Erro ao verificar código OTP. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleMudarAsenha = async () => {
    const changePasswordData: ChangePassword = {
      password: mudarPassword,
      repeatPassword: mudarPasswordConf,
    };

    try {
      setLoading(true);
      await changePassword(resetEmail, changePasswordData);
      setShowResetPassword3(false);
      navigate("SignIn");
    }
    catch (error) {
      console.error("Erro ao mudar senha:", error);
      Alert.alert("Erro ao alterar senha. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <LogoSvg width={200} height={150} />

      {showResetPassword ? (
        <ResetPasswordForm
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          handleEnvioCodigoOtp={handleEnvioCodigoOtp}
          loading={loading}
        />
      ) : showResetPassword2 ? (
        <ResetPasswordForm2
          codigoOtp={codigoOtp}
          setCodigoOtp={setCodigoOtp}
          handleVerificarCodigoOtp={handleVerificarCodigoOtp}
          handleEnvioCodigoOtp2={handleEnvioCodigoOtp2} // Aqui adicionado handleEnvioCodigoOtp2
          loading={loading}
        />
      ) : showResetPassword3 ? (
        <ResetPasswordForm3
          Password={mudarPassword}
          setPassword={setMudarPassword}
          confPassword={mudarPasswordConf}
          setConfPassword={setMudarPasswordConf}
          handleMudarAsenha={handleMudarAsenha}
          loading={loading}
        />
      ) : null}
    </View>
  );
}

export default ResetPassword;
