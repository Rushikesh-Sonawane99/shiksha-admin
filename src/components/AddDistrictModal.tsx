import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "next-i18next";
import { getStateBlockDistrictList } from "@/services/MasterDataService";

interface AddDistrictBlockModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    value: string,
    controllingField: string,
    fieldId: string,
    districtId?: string
  ) => void;
  fieldId: string;
  initialValues?: {
    name?: string;
    value?: string;
    controllingField?: string;
  };
  districtId?: string;
}

const AddDistrictModal: React.FC<AddDistrictBlockModalProps> = ({
  open,
  onClose,
  onSubmit,
  fieldId,
  initialValues = {},
  districtId,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    controllingField: "",
  });

  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // Set initial values including controllingField (state) for editing mode
    setFormData({
      name: initialValues.name || "",
      value: initialValues.value || "",
      controllingField: initialValues.controllingField || "", // Set initial state value
    });
  }, [initialValues]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStateBlockDistrictList({
          fieldName: "states",
        });
        if (response) {
          setStates(response.result.values);
        } else {
          console.error("Unexpected response format:", response);
          setStates([]);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      }
    };

    if (open) fetchStates();
  }, [open]);

  const handleChange =
    (field: keyof typeof formData) =>
    (
      e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
      const { value } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = () => {
    onSubmit(
      formData.name,
      formData.value,
      formData.controllingField,
      fieldId,
      districtId
    );
    setFormData({
      name: "",
      value: "",
      controllingField: "",
    });
    onClose();
  };

  const isEditing = !!initialValues.name;
  const buttonText = isEditing ? t("COMMON.UPDATE") : t("COMMON.SUBMIT");
  const dialogTitle = isEditing
    ? t("COMMON.UPDATE_DISTRICT")
    : t("COMMON.ADD_DISTRICT");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: "14px" }}>{dialogTitle}</DialogTitle>
      <DialogContent>
        <>
          <Select
            value={formData.controllingField}
            onChange={(e) =>
              handleChange("controllingField")(
                e as React.ChangeEvent<HTMLInputElement>
              )
            }
            fullWidth
            displayEmpty
            variant="outlined"
            margin="dense"
          >
            <MenuItem value="" disabled>
              {t("COMMON.SELECT_STATE")}
            </MenuItem>
            {states.map((state) => (
              <MenuItem key={state.value} value={state.value}>
                {state.label} {/* Displaying state label */}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label={t("COMMON.DISTRICT_NAME")}
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            label={t("COMMON.DISTRICT_CODE")}
            type="text"
            fullWidth
            variant="outlined"
            value={formData.value}
            onChange={handleChange("value")}
          />
          <Box display="flex" alignItems="center" mt={2}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="caption" color="textSecondary">
              {t("COMMON.CODE_NOTIFICATION")}
            </Typography>
          </Box>
        </>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            border: "none",
            color: "secondary",
            fontSize: "14px",
            fontWeight: "500",
            "&:hover": {
              border: "none",
              backgroundColor: "transparent",
            },
          }}
          variant="outlined"
        >
          {t("COMMON.CANCEL")}
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            width: "auto",
            height: "40px",
          }}
          variant="contained"
          color="primary"
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDistrictModal;
