import styled from "styled-components/macro";

const flex_variants = {
  column: "column",
  row: "row",
};

const dimension_variants = {
  carousel: {height:"100%", width:"300px"},
  filter: {height:"180px", width:"350px"},
};

const snapshot_variant = {
  carousel: { width: "100%", height: "60%" },
  filter: { width: "50%", height: "100%" },
};

const border_snapshot_variant = {
  carousel: "10px 10px 0px 0px",
  filter: "10px 0 0px 10px",
};

const Card = styled.div`
  margin: 10px;
  flex: 0 0 ${({dimension}) => {return dimension_variants[dimension].width ?? dimension_variants["carousel"].width;}};
  height: ${({ dimension }) => {
    return dimension_variants[dimension].height ?? dimension_variants["carousel"].height;
  }};
  display: flex;
  flex-direction: ${({ flex_variant }) => {
    return flex_variants[flex_variant] ?? flex_variants["column"];
  }};
  background-color: ${({ theme }) => theme.colors.whiteGray};
  justify-content: space-between;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  border-radius: 10px 10px 10px 10px;
`;

const CardSnapshot = styled.div`
  width: ${({ variant }) => {
    return (
      snapshot_variant[variant].width ?? snapshot_variant["carousel"].width
    );
  }};
  height: ${({ variant }) => {
    return (
      snapshot_variant[variant].height ?? snapshot_variant["carousel"].height
    );
  }};
`;

const Snapshot = styled.img`
  margin: 1px;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  border-radius: ${({ variant }) => {
    return (
      border_snapshot_variant[variant] ?? border_snapshot_variant["carousel"]
    );
  }};
`;

const CardDetail = styled.div`
  margin-top: 1rem;
  padding: 0 2rem;
  width: 100%;
  height: 40%;
`;

const CardFilterDetail = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

const DetailCourseTittle = styled.div`
  width: 100%;
  height: 20%;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 900;
`;

const DetailCourseInstructor = styled.div`
  width: 100%;
  height: 20%;
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
`;

const DetailCourseScore = styled.div`
  width: 100%;
  height: 20%;
  color: ${({ theme }) => theme.colors.wine};
  font-size: 18px;
  font-weight: 800;
  display: flex;
  flex-direction: row;
`;

const DetailPriceAndButtons = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
`;

const DetailPrice = styled.div`
  width: 50%;
  height: 100%;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
`;

const BeforeButtons = styled.div`
  width: 20%;
`;

const DetailButtons = styled.div`
  width: 30%;
  height: 100%;
  text-align: right;
  display: flex;
  flex-direction: row;
  padding-left: 0.8rem;
`;

const Icon = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  color: ${({ theme }) => theme.colors.turquoise};
`;

const StarsIcon = styled.div`
  padding-left: 0.5rem;
  color: ${({ theme }) => theme.colors.wine};
`;

const CourseCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export {
  Card,
  CardSnapshot,
  Snapshot,
  CardDetail,
  CardFilterDetail,
  DetailCourseInstructor,
  DetailCourseTittle,
  DetailCourseScore,
  DetailPriceAndButtons,
  DetailPrice,
  DetailButtons,
  Icon,
  StarsIcon,
  CourseCardWrapper,
  BeforeButtons,
};
