import styled from "@emotion/styled";
// 定义一个通用的css样式
export const Row = styled.div<{ gap?: number | boolean }>` // 可以在这里添加泛型
  display: flex;
  flex-direction: row;
  align-items: center; // 让Row的直接子元素全都垂直居中,如果直接子元素中用margin-top/bottom会影响垂直居中
  // 所以通过下面的设置去掉 为啥不在全局中去掉所有子元素的margin-top/bottom?
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`
