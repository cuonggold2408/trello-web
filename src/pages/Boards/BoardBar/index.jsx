import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
import avatarIcon from "~/assets/images/avatar.png";
import Button from "@mui/material/Button";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

const TRELLO_MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    backgroundColor: "primary.50",
  },
};

export default function BoardBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        borderBottom: "1px solid white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={TRELLO_MENU_STYLES}
          icon={<DashboardIcon />}
          label="CuongNguyen-Devhogquao"
          clickable
        />
        <Chip
          sx={TRELLO_MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={TRELLO_MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={TRELLO_MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={TRELLO_MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter Cards"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
            },
          }}
          variant="outlined"
          startIcon={<PersonAddAltRoundedIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={6}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 38,
              height: 38,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": {
                bgcolor: "#a4b0be",
              },
            },
          }}
        >
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
          <Tooltip title="CuongNguyen">
            <Avatar alt="avatar" src={avatarIcon} />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}
