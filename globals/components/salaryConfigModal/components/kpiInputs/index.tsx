import {
  KPI_TEACHING,
  KPI_EXAM,
  KPI_INCALL,
  KPI_FRESHMAN,
  KPI_ADDITIONAL_1,
  KPI_ADDITIONAL_2,
  KPI_ADDITIONAL_3,
  KPI_SUPPORT,
  KPI_LOST_BACK,
  KPI_OFFENCE,
  KPI_ONLINE_PAYMENT,
  KPI_REGISTERED_STUDENT,
  KPI_STUDENT_AMOUNT,
  KPI_PASSING_RATE,
  KPI_COMMUNITY_MANAGER,
} from "constants/kpi";
import { Wrapper } from "./style";
import React from "react";
import { CirclePlusSvg, DeleteSvg, InputNumber } from "components";

interface IProps {
  control: any;
  index: number;
  name: string;
  watch?: any;
  teachingFields?: any[];
  teachingRemove?: any;
  teachingAppend?: any;
}

export const KPIInputs = ({
  control,
  index,
  name,
  teachingFields,
  teachingRemove,
  teachingAppend,
}: IProps) => {
  const handleCLickPLus = () => {
    teachingAppend({});
  };

  return {
    [KPI_TEACHING]: (
      <Wrapper>
        {teachingFields &&
          teachingFields.map((item, i) => {
            return (
              <div className="teaching">
                <InputNumber
                  label="From"
                  placeholder="month"
                  name={`${name}.${index}.ranges.${i}.from`}
                  control={control}
                  style={{ height: "100%" }}
                />
                <InputNumber
                  label="To"
                  placeholder="month"
                  name={`${name}.${index}.ranges.${i}.to`}
                  control={control}
                />
                <InputNumber
                  label="Group"
                  placeholder="0"
                  name={`${name}.${index}.ranges.${i}.group_share`}
                  control={control}
                  suffix={<span className="suffix">%</span>}
                  style={{ height: "100%" }}
                />
                <InputNumber
                  label="Individual"
                  placeholder="0"
                  name={`${name}.${index}.ranges.${i}.individual_share`}
                  control={control}
                  suffix={<span className="suffix">%</span>}
                />
                {i === 0 ? (
                  <span
                    className="plus"
                    style={{
                      marginLeft: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignSelf: "center",
                      marginTop: "25px",
                    }}
                    onClick={handleCLickPLus}
                  >
                    <CirclePlusSvg />
                  </span>
                ) : (
                  <span
                    className="plus"
                    style={{
                      marginLeft: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      alignSelf: "center",
                      marginTop: "25px",
                    }}
                    onClick={() => teachingRemove(i)}
                  >
                    <DeleteSvg
                      style={{ cursor: "pointer" }}
                      width="20px"
                      height="20px"
                    />
                  </span>
                )}
              </div>
            );
          })}
      </Wrapper>
    ),
    [KPI_EXAM]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="Group"
              placeholder="0"
              name={`${name}.${index}.group`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />
            <InputNumber
              label="Individual"
              placeholder="0"
              name={`${name}.${index}.group1`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_PASSING_RATE]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="From percent"
              placeholder="0"
              name={`${name}.${index}.from_percent`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />
            <InputNumber
              label="Amount per percent"
              placeholder="0"
              name={`${name}.${index}.amount_per_percent`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_SUPPORT]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="From percent"
              placeholder="0"
              name={`${name}.${index}.from_percent`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />
            <InputNumber
              label="To percent"
              placeholder="0"
              name={`${name}.${index}.to_percent`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />

            <InputNumber
              label="Amount per percent"
              placeholder="0"
              name={`${name}.${index}.amount_per_percent`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_STUDENT_AMOUNT]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="Amount per count"
              placeholder="0"
              name={`${name}.${index}.amount_per_count`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_COMMUNITY_MANAGER]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="Amount per count"
              placeholder="0"
              name={`${name}.${index}.amount_per_count`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_ONLINE_PAYMENT]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="To percent"
              placeholder="0"
              name={`${name}.${index}.to_percent`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />
            <InputNumber
              label="From percent"
              placeholder="0"
              name={`${name}.${index}.from_percent`}
              control={control}
              suffix={<span className="suffix">%</span>}
              style={{ height: "100%" }}
            />
            <InputNumber
              label="Amount per percent"
              placeholder="0"
              name={`${name}.${index}.amount_per_percent`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_OFFENCE]: (
      <div>
        <Wrapper>
          <div className="teaching">
            {/*<InputNumber*/}
            {/*  label="Amount per own"*/}
            {/*  placeholder="0"*/}
            {/*  name={`${name}.${index}.amount_per_own`}*/}
            {/*  control={control}*/}
            {/*  suffix={<span className="suffix">UZS</span>}*/}
            {/*  style={{ height: "100%" }}*/}
            {/*/>{" "}*/}
            <InputNumber
              label="Amount per accept"
              placeholder="0"
              name={`${name}.${index}.amount_per_accept`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
            <InputNumber
              label="Amount per reject"
              placeholder="0"
              name={`${name}.${index}.amount_per_reject`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_ADDITIONAL_1]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="Total salary"
              placeholder="0"
              name={`${name}.${index}.total_salary`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_ADDITIONAL_2]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <InputNumber
              label="Fix salary"
              placeholder="0"
              name={`${name}.${index}.fix_salary`}
              control={control}
              suffix={<span className="suffix">UZS</span>}
              style={{ height: "100%" }}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_ADDITIONAL_3]: (
      <Wrapper>
        {/*<div className="teaching">*/}
        {/*  <InputNumber*/}
        {/*    label="Group"*/}
        {/*    placeholder="0"*/}
        {/*    name={`${name}.${index}.group_share`}*/}
        {/*    control={control}*/}
        {/*    suffix={<span className="suffix">%</span>}*/}
        {/*    style={{ height: "100%" }}*/}
        {/*  />*/}
        {/*  <InputNumber*/}
        {/*    label="Individual"*/}
        {/*    placeholder="0"*/}
        {/*    name={`${name}.${index}.individual_share`}*/}
        {/*    control={control}*/}
        {/*    suffix={<span className="suffix">%</span>}*/}
        {/*  />*/}
        {/*</div>*/}
        {teachingFields &&
          teachingFields.map((item, i) => {
            return (
              <div className="teaching">
                <InputNumber
                  label="From"
                  placeholder="month"
                  name={`${name}.${index}.ranges.${i}.from`}
                  control={control}
                  style={{ height: "100%" }}
                />
                <InputNumber
                  label="To"
                  placeholder="month"
                  name={`${name}.${index}.ranges.${i}.to`}
                  control={control}
                />
                <InputNumber
                  label="Group"
                  placeholder="0"
                  name={`${name}.${index}.ranges.${i}.group_share`}
                  control={control}
                  suffix={<span className="suffix">%</span>}
                  style={{ height: "100%" }}
                />
                <InputNumber
                  label="Individual"
                  placeholder="0"
                  name={`${name}.${index}.ranges.${i}.individual_share`}
                  control={control}
                  suffix={<span className="suffix">%</span>}
                />
                {i === 0 ? (
                  <span
                    className="plus"
                    style={{
                      marginLeft: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignSelf: "center",
                      marginTop: "25px",
                    }}
                    onClick={handleCLickPLus}
                  >
                    <CirclePlusSvg />
                  </span>
                ) : (
                  <span
                    className="plus"
                    style={{
                      marginLeft: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      alignSelf: "center",
                      marginTop: "25px",
                    }}
                    onClick={() => teachingRemove(i)}
                  >
                    <DeleteSvg
                      style={{ cursor: "pointer" }}
                      width="20px"
                      height="20px"
                    />
                  </span>
                )}
              </div>
            );
          })}
      </Wrapper>
    ),
    [KPI_INCALL]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.1.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.1.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.1.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.2.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.2.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.2.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>

          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.3.count_from`}
                control={control}
                // defaultValue={0}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.3.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.3.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_FRESHMAN]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.1.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.1.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.1.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.2.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.2.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.2.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>

          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.3.count_from`}
                control={control}
                // defaultValue={0}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.3.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.3.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_REGISTERED_STUDENT]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.1.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.1.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.1.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.2.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.2.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.2.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>

          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.3.count_from`}
                control={control}
                // defaultValue={0}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.3.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.3.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
        </Wrapper>
      </div>
    ),
    [KPI_LOST_BACK]: (
      <div>
        <Wrapper>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.1.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.1.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.1.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.2.count_from`}
                control={control}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.2.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.2.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>

          <div className="teaching">
            <div className="teaching">
              <InputNumber
                label="From"
                placeholder="0"
                name={`${name}.${index}.3.count_from`}
                control={control}
                // defaultValue={0}
                suffix={<span></span>}
              />
              <InputNumber
                label="To"
                placeholder="0"
                name={`${name}.${index}.3.count_to`}
                control={control}
                suffix={<span></span>}
              />
            </div>
            <InputNumber
              label="Amount"
              placeholder="0"
              name={`${name}.${index}.3.amount`}
              control={control}
              suffix={<span className="suffix uzs">UZS</span>}
            />
          </div>
        </Wrapper>
      </div>
    ),
  };
};
