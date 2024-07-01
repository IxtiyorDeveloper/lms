import { ClassASvg, ClassBSvg, ClassCSvg } from "../components";
import React from "react";
import { ETeacherClass } from "../types";

export const ranking_classes = {
  [ETeacherClass.A]: <ClassASvg width={20} height={20} />,
  [ETeacherClass.B]: <ClassBSvg width={20} height={20} />,
  [ETeacherClass.C]: <ClassCSvg width={20} height={20} />,
};

export const ranking_classes_names = {
  [ETeacherClass.A]: "Class A",
  [ETeacherClass.B]: "Class B",
  [ETeacherClass.C]: "Class C",
};
