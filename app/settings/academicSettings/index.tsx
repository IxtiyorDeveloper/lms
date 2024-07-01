import React, { useMemo, useRef } from "react";
import { Inner, Wrapper } from "./style";
import { Button, ComplexThinTab, PlusSvg } from "components";
import { textColors } from "styles/theme";
import { CourseModal, Courses } from "./components";
import Router, { useRouter } from "next/router";
import LeavingCategories from "./leavingCategories";
import Tools from "./tools";
import Locations from "./locations";
import RegionModal from "./locations/components/regionModal";
import DeleteCourse from "globals/components/deleteCourse";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

export type TModal = "course";
const AcademicSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpenRegionEditModal = (id: number) => {
    ref.current.open(id);
  };

  const menu = useMemo(() => {
    return [
      {
        label: "Courses",
        children: <Courses />,
        query: { mainTab: 0 },
        isClickable: true,
      },
      {
        label: "Locations",
        children: (
          <Locations handleOpenRegionEditModal={handleOpenRegionEditModal} />
        ),
        query: { mainTab: 1 },
        isClickable: true,
      },
      {
        label: "Leaving categories",
        children: <LeavingCategories />,
        query: { mainTab: 2 },
        isClickable: true,
      },
      {
        label: "Tools",
        children: <Tools />,
        query: { mainTab: 3 },
        isClickable: true,
      },
    ];
  }, []);

  const ref = useRef<any>();

  const leftChild = {
    "0": (
      <CheckPermission
        permission={[COMPONENTS_VIEWS.can_manage_academic_settings]}
      >
        <Button
          icon={<PlusSvg />}
          onClick={() =>
            dispatch(
              toggleModal({
                key: "createCourse",
                data: {
                  data: {
                    type: "create",
                  },
                  open: true,
                },
              })
            )
          }
          style={{ padding: "0 24px", color: textColors.blueGray }}
        >
          COURSE
        </Button>
      </CheckPermission>
    ),
    "1": (
      <Button
        icon={<PlusSvg />}
        style={{ padding: "0 24px", color: textColors.blueGray }}
        onClick={() => ref.current?.open()}
      >
        REGION
      </Button>
    ),
    "2": "",
    "3": "",
  };

  return (
    <Wrapper>
      <DeleteCourse />
      <CourseModal />
      <Inner>
        <ComplexThinTab
          menu={menu}
          styles={{ padding: "20px" }}
          topLeftChildren={
            leftChild[(router.query.mainTab as keyof typeof leftChild) ?? 0]
          }
          initValue={+Router.query.mainTab! || 0}
        />
      </Inner>
      <RegionModal ref={ref} />
    </Wrapper>
  );
};

export default AcademicSettings;
