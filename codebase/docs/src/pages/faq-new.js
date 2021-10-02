import React from 'react'
import Layout from '@theme/Layout'
import { Button, Row, Col } from 'reactstrap'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

function FAQ() {
  const context = useDocusaurusContext()
  return (
    <Layout
      title='FAQ'
      description='Best selling, Production Ready, Carefully Crafted, Extensive Admin Template'
    ></Layout>
  )
}

export default FAQ
