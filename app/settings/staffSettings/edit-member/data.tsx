import { bgColors, textColors } from "styles/theme";
import { LabelWrapper } from "./style";
import { Tabs } from "./tabs";
import React from "react";
import {
  IStaffTabPermissions,
  IStaffViewPageInfoData,
} from "../../../../types/staffSettings";
import { NextRouter } from "next/router";

export const typeSelect = {
  official: {
    styles: {
      backgroundColor: bgColors.midori,
      color: textColors.white,
    },
    text: "Official",
  },
  nonOfficial: {
    styles: {
      backgroundColor: bgColors.dark,
      color: textColors.white,
    },
    text: "Non Official",
  },
  selfEmployment: {
    styles: {
      backgroundColor: bgColors.primary,
      color: textColors.blueGray,
    },
    text: "Self Employed",
  },
};

export const menu = {
  main_info: "main_info",
  academic_info: "academic_info",
  document: "document",
  education: "education",
  family: "family",
  work_experience: "work_experience",
  life_cycle: "life_cycle",
};

export const menuList = {
  main_info: {
    label: (
      <LabelWrapper>
        <p className="text">Main info</p>
      </LabelWrapper>
    ),
    value: Tabs.PERSONAL,
  },
  academic_info: {
    label: (
      <LabelWrapper>
        <p className="text">Academic info</p>
      </LabelWrapper>
    ),
    value: Tabs.ACADEMIC,
  },
  document: {
    label: (
      <LabelWrapper>
        <p className="text">Document</p>
      </LabelWrapper>
    ),
    value: Tabs.DOCUMENT,
  },
  education: {
    label: (
      <LabelWrapper>
        <p className="text">Education</p>
      </LabelWrapper>
    ),
    value: Tabs.EDUCATION,
  },
  family: {
    label: (
      <LabelWrapper>
        <p className="text">Family</p>
      </LabelWrapper>
    ),
    value: Tabs.FAMILY,
  },
  work_experience: {
    label: (
      <LabelWrapper>
        <p className="text">Work experience</p>
      </LabelWrapper>
    ),
    value: Tabs.WORK_EXPERIENCE,
  },
  life_cycle: {
    label: (
      <LabelWrapper>
        <p className="text">Lifecycle</p>
      </LabelWrapper>
    ),
    value: Tabs.LIFE_CYCLE,
  },
};

export const getMenu = (dataGetOne: any) => {
  let arr: any[] = [];
  const permissionKeys = Object.keys(dataGetOne?.tabPermissions || {});

  const permissionsArray = swapKeys(permissionKeys).map((text: string) => {
    return {
      tabName: text,
      isVisible: dataGetOne?.tabPermissions[text as keyof IStaffTabPermissions],
    };
  });
  permissionsArray.map((permission) => {
    if (permission.isVisible)
      arr.push(menuList[permission.tabName as keyof typeof menuList]);
  });
  return arr;
};

export const checkTabPermission = (
  tab_key: string,
  dataGetOne?: IStaffViewPageInfoData
) => {
  const userTabPermissions = dataGetOne?.tabPermissions;
  let isPermitted = false;

  if (userTabPermissions !== undefined) {
    for (let key in userTabPermissions) {
      const value = userTabPermissions[key as keyof typeof userTabPermissions];
      if (key === tab_key && value) isPermitted = true;
    }
  }

  return isPermitted ? tab_key : false;
};

export const getFirstAvailableTab = (dataGetOne?: IStaffViewPageInfoData) => {
  const userTabPermissions = dataGetOne?.tabPermissions;
  let permittedTabs: string[] = [];

  if (userTabPermissions !== undefined) {
    for (let key in userTabPermissions) {
      const value = userTabPermissions[key as keyof typeof userTabPermissions];

      if (value) {
        permittedTabs.push(key);
      }
    }
  }

  return permittedTabs[0];
};

function swapKeys(keys: string[]) {
  // Check if both "work_experience" and "family" exist in the array
  const hasWorkExperience = keys.includes("work_experience");
  const hasFamily = keys.includes("family");

  // Swap positions if both exist and "work_experience" is in front
  if (hasWorkExperience && hasFamily) {
    const workExperienceIndex = keys.indexOf("work_experience");
    const familyIndex = keys.indexOf("family");

    // Check if "work_experience" is in front
    if (workExperienceIndex < familyIndex) {
      // Swap the positions
      [keys[workExperienceIndex], keys[familyIndex]] = [
        keys[familyIndex],
        keys[workExperienceIndex],
      ];
    }
  }

  return keys;
}
