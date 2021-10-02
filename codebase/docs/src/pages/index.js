import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import { ArrowRight } from 'react-feather'
import { Button } from 'reactstrap'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles.module.css'

const features = [
  {
    title: 'Based on Reactstrap',
    desc: 'With Reactstrap you can build responsive, mobile-first, and ARIA accessible projects on the web'
  },
  {
    title: 'Hooks Support',
    desc: 'Hooks are functions that let you “hook into” React state and lifecycle features from function components.'
  },
  {
    title: 'JWT Auth, ACL, etc.',
    desc: 'Vuexy provides extendable JWT auth which can be configured easily and provides ready to use ACL'
  }
]

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={siteConfig.title}
      description='Best selling, Production Ready, Carefully Crafted, Extensive Admin Template'
    >
      <header className={clsx('hero border-bottom text-center', styles.heroBanner)}>
        <div className='container'>
          <img src='img/logo.svg' alt='logo' height='100' width='160' />
          <h1 className={clsx('hero__title', styles.heroTitle)}>Vuexy - React Admin Dashboard Template</h1>
          <p className={clsx('hero__subtitle', styles.heroSubTitle)}>
            Best selling, Production Ready, Carefully Crafted, Extensive Admin Template
          </p>
          <Button className='btn-get-started' size='lg' color='primary' tag={Link} to={useBaseUrl('docs/')}>
            <span>Get Started</span> <ArrowRight className='mt-n1' size={24} />
          </Button>
        </div>
      </header>
      <main>
        <div className={clsx('features container', styles.features)}>
          {features.map(feat => {
            return (
              <div key={feat.title} className={clsx('feature', styles.feature)}>
                <h4>{feat.title}</h4>
                <p className='mb-0'>{feat.desc}</p>
              </div>
            )
          })}
        </div>
      </main>
    </Layout>
  )
}

export default Home
