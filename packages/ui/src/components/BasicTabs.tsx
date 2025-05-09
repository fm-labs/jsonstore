import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'

interface BasicTabPanelProps {
  children?: React.ReactNode
  index: number
  selected: number
}

export interface BasicTabItem extends PropsWithChildren<any> {
  label: string
}

export interface BasicTabsProps {
  items: BasicTabItem[]
}

function buildTabProps(index: number) {
  return {
    id: `basic-tab-${index}`,
    'aria-controls': `basic-tabpanel-${index}`,
  }
}

function BasicTabPanel(props: BasicTabPanelProps) {
  const { children, selected, index, ...other } = props

  return (
    <Box
      sx={{ p: 0, m: 0 }}
      role='tabpanel'
      hidden={selected !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {selected === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </Box>
  )
}

export function BasicTabs({ items }: BasicTabsProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label={'Tabs'}>
          {items.map((item: BasicTabItem, idx) => {
            return <Tab key={idx} label={item.label} {...buildTabProps(idx)} />
          })}
        </Tabs>
      </Box>

      {items.map((item: BasicTabItem, idx) => {
        return (
          <BasicTabPanel key={idx} selected={value} index={idx}>
            {item.children}
          </BasicTabPanel>
        )
      })}
    </Box>
  )
}
