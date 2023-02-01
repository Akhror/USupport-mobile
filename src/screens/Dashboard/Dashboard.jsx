import React, { useState, useMemo, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StyleSheet, ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

import {
  Screen,
  AppText,
  AppButton,
  ConsultationDashboard,
  Loading,
} from "#components";
import {
  ArticlesDashboard,
  MascotHeadingBlock,
  ConsultationsDashboard,
} from "#blocks";
import { EditConsultation } from "#backdrops";
import { mascotHappyPurple } from "#assets";
import { appStyles } from "#styles";
import { userSvc } from "#services";
import {
  useAcceptConsultation,
  useBlockSlot,
  useRescheduleConsultation,
  useGetAllConsultations,
  useScheduleConsultation,
  useGetClientData,
} from "#hooks";
import { ONE_HOUR } from "#utils";

/**
 * Dashboard
 *
 * Dashboard page
 *
 * @returns {JSX.Element}
 */
export const Dashboard = ({ navigation }) => {
  const { t } = useTranslation("dashboard");

  const [isTmpUser, setIsTmpUser] = useState(null);

  useEffect(() => {
    userSvc.getUserID().then((id) => {
      setIsTmpUser(id === "tmp-user");
    });
  }, []);

  const clientData = useGetClientData(isTmpUser === false ? true : false)[1];
  const clientName = clientData
    ? clientData?.nickname || `${clientData.name} ${clientData.surname}`
    : "";

  const queryClient = useQueryClient();

  const consultationPrice = useRef();

  // Get the consultations data only if the user is NOT temporary
  const consultationsQuery = useGetAllConsultations(
    isTmpUser === false ? true : false
  );
  // isTmpUser === false ? useGetAllConsultations() : {};

  const upcomingConsultations = useMemo(() => {
    const currentDateTs = new Date().getTime();
    if (consultationsQuery?.data) {
      return consultationsQuery.data
        ?.filter((consultation) => {
          const endTime = consultation.timestamp + ONE_HOUR;
          return (
            consultation.timestamp >= currentDateTs ||
            (currentDateTs >= consultation.timestamp &&
              currentDateTs <= endTime)
          );
        })
        .sort((a, b) => a.timestamp - b.timestamp);
    }
    return null;
  }, [consultationsQuery.data]);

  const [isRequireDataAgreementOpen, setIsRequireDataAgreementOpen] =
    useState(false);
  const openRequireDataAgreement = () => setIsRequireDataAgreementOpen(true);
  const closeRequireDataAgreement = () => setIsRequireDataAgreementOpen(false);

  const [selectedConsultation, setSelectedConsultation] = useState();
  const [selectedConsultationProviderId, setSelectedConsultationProviderId] =
    useState();
  const [selectedConsultationId, setSelectedConsultationId] = useState();
  const [isEditConsultationOpen, setIsEditConsultationOpen] = useState(false);

  const openEditConsultation = (consultation) => {
    setSelectedConsultationId(consultation.consultationId);
    setSelectedConsultationProviderId(consultation.providerId);
    setSelectedConsultation(consultation);
    setIsEditConsultationOpen(true);
  };
  const closeEditConsultation = () => setIsEditConsultationOpen(false);

  const [isCancelConsultationOpen, setIsCancelConsultationOpen] =
    useState(false);
  const openCancelConsultation = () => setIsCancelConsultationOpen(true);
  const closeCancelConsultation = () => setIsCancelConsultationOpen(false);

  const [isJoinConsultationOpen, setIsJoinConsultationOpen] = useState(false);
  const openJoinConsultation = (consultation) => {
    setSelectedConsultation(consultation);
    setIsJoinConsultationOpen(true);
  };
  const closeJoinConsultation = () => setIsJoinConsultationOpen(false);

  const [isEditingConsultation, setIsEditingConsultation] = useState(true);
  const [isBlockSlotSubmitting, setIsBlockSlotSubmitting] = useState(false);
  const [blockSlotError, setBlockSlotError] = useState();
  const [consultationId, setConsultationId] = useState();
  const [selectedSlot, setSelectedSlot] = useState();

  // Modal state variables
  const [
    isSelectConsultationBackdropOpen,
    setIsSelectConsultationBackdropOpen,
  ] = useState(false);
  const [isConfirmBackdropOpen, setIsConfirmBackdropOpen] = useState(false);

  // Open modals
  const openSelectConsultation = () =>
    setIsSelectConsultationBackdropOpen(true);
  const openConfirmConsultationBackdrop = () => setIsConfirmBackdropOpen(true);

  // Close modals
  const closeConfirmConsultationBackdrop = () =>
    setIsConfirmBackdropOpen(false);
  const closeSelectConsultationBackdrop = () =>
    setIsSelectConsultationBackdropOpen(false);

  // Accept consultation logic

  const onAcceptConsultationSuccess = () => {
    toast(t("accept_success"));
  };
  const onAcceptConsultationError = (error) => {
    toast(error, { type: "error" });
  };
  const acceptConsultationMutation = useAcceptConsultation(
    onAcceptConsultationSuccess,
    onAcceptConsultationError
  );

  const handleAcceptSuggestion = (consultationId, price) => {
    acceptConsultationMutation.mutate({ consultationId, price });
  };

  // Schedule consultation logic
  const onRescheduleConsultationSuccess = () => {
    setIsBlockSlotSubmitting(false);
    setConsultationId(consultationId);
    closeSelectConsultationBackdrop();
    openConfirmConsultationBackdrop();
    setBlockSlotError(null);

    queryClient.invalidateQueries(["all-consultations"]);
  };
  const onRescheduleConsultationError = (error) => {
    setBlockSlotError(error);
    setIsBlockSlotSubmitting(false);
  };
  const rescheduleConsultationMutation = useRescheduleConsultation(
    onRescheduleConsultationSuccess,
    onRescheduleConsultationError
  );

  const onScheduleConsultationError = (error) => {
    toast(error, { type: "error" });
  };
  const scheduleConsultationMutation = useScheduleConsultation(
    onRescheduleConsultationSuccess,
    onScheduleConsultationError
  );

  // Block slot logic
  const onBlockSlotSuccess = (newConsultationId) => {
    if (isEditingConsultation) {
      rescheduleConsultationMutation.mutate({
        consultationId: selectedConsultationId,
        newConsultationId,
      });
    } else {
      if (consultationPrice.current && consultationPrice.current > 0) {
        navigate(`/checkout`, { state: { consultationId: consultationId } });
      } else {
        scheduleConsultationMutation.mutate(selectedConsultationId);
      }
    }
  };
  const onBlockSlotError = (error) => {
    setBlockSlotError(error);
    setIsBlockSlotSubmitting(false);
  };
  const blockSlotMutation = useBlockSlot(onBlockSlotSuccess, onBlockSlotError);

  const handleBlockSlot = (slot, price) => {
    setIsBlockSlotSubmitting(true);
    setSelectedSlot(slot);
    consultationPrice.current = price;
    blockSlotMutation.mutate({
      slot,
      providerId: selectedConsultationProviderId,
    });
  };
  const handleScheduleConsultation = () => {
    if (!clientData.dataProcessing) {
      openRequireDataAgreement();
    } else {
      navigate("/select-provider");
    }
  };

  const handleDataAgreementSucess = () => navigate("/select-provider");

  return (
    <Screen>
      <ScrollView>
        <MascotHeadingBlock image={mascotHappyPurple}>
          {clientData?.isLoading || isTmpUser === null ? (
            <Loading />
          ) : (
            <HeadingBlockContent
              isTmpUser={isTmpUser}
              t={t}
              clientName={clientName}
              upcomingConsultations={upcomingConsultations}
              openJoinConsultation={openJoinConsultation}
              openEditConsultation={openEditConsultation}
              handleScheduleConsultation={handleScheduleConsultation}
              handleAcceptSuggestion={handleAcceptSuggestion}
            />
          )}
        </MascotHeadingBlock>
        <ArticlesDashboard navigation={navigation} />
        <ConsultationsDashboard
          openJoinConsultation={openJoinConsultation}
          openEditConsultation={openEditConsultation}
          handleAcceptSuggestion={handleAcceptSuggestion}
          handleSchedule={handleScheduleConsultation}
          upcomingConsultations={upcomingConsultations}
          isLoading={consultationsQuery.isLoading}
          t={t}
          navigation={navigation}
        />
      </ScrollView>
      {selectedConsultation && (
        <EditConsultation
          isOpen={isEditConsultationOpen}
          onClose={closeEditConsultation}
          openCancelConsultation={openCancelConsultation}
          openSelectConsultation={openSelectConsultation}
          consultation={selectedConsultation}
        />
      )}
    </Screen>
  );
};

const HeadingBlockContent = ({
  isTmpUser,
  t,
  clientName,
  handleRegistrationModalOpen,
  upcomingConsultations,
  openJoinConsultation,
  openEditConsultation,
  handleScheduleConsultation,
  handleAcceptSuggestion,
}) => {
  return (
    <View>
      {isTmpUser ? (
        <>
          <AppText namedStyle="h3" style={styles.colorTextBlue}>
            {t("no_registration_heading")}
          </AppText>
          <AppText style={[styles.marginTop16, styles.colorTextBlue]}>
            {t("no_registration_subheading")}
          </AppText>
          <AppButton
            label={t("create_account_button")}
            color="purple"
            size="md"
            onPress={handleRegistrationModalOpen}
            style={[styles.alignSelfStart, styles.marginTop16]}
          />
        </>
      ) : (
        <>
          <AppText namedStyle="h3">{t("welcome", { clientName })}</AppText>
          <AppText style={[styles.marginTop16, appStyles.colorTextBlue]}>
            {t("next_consultation")}
          </AppText>
          <ConsultationDashboard
            consultation={
              upcomingConsultations ? upcomingConsultations[0] : null
            }
            style={styles.marginTop16}
            handleJoin={openJoinConsultation}
            handleEdit={openEditConsultation}
            handleSchedule={handleScheduleConsultation}
            handleAcceptSuggestion={handleAcceptSuggestion}
            t={t}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  marginTop16: { marginTop: 16 },
  alignSelfStart: { alignSelf: "flex-start" },
  colorTextBlue: { color: appStyles.colorBlue_263238 },
});
