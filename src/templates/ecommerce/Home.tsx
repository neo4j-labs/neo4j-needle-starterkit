import Header from '../shared/components/Header';
import Content from './Content';
import React, { useState } from 'react';
import { ThemeWrapperContext } from '../../context/ThemeWrapper';

export default function Home() {
  return (
    <div>
      <Header title='Neoshop' navItems={[]} />
      <Content />
    </div>
  );
}
