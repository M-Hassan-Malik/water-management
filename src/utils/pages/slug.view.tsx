/* eslint-disable */
import { useRouter } from 'next/router';
import {  useEffect, useRef, useState } from 'react';

import { Core } from '@/components';
import { System } from '@/system';

import type { ModuleSlugPageProps } from './slug.types';
import React from 'react';
import { useSelector } from 'react-redux';

const InternalPageUI = ({ }: ModuleSlugPageProps) => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const viewRef = useRef<any>();
  const [view, setView] = useState('')

  useEffect(() => {
    let systemInstance;
    const loadView = async () => {
      const { pid, slug } = router.query;
      systemInstance = System.getInstance(user)
      const view: any = await systemInstance.getView(
        `${pid}.${slug}` as any
      );
      setView(view)
      viewRef.current = view;
      setLoading(false);
    };

    if (!router.isReady) return;
    loadView();
  }, [router.isReady, router.query, user, view]);

  return loading ? <Core.LoadingComponent /> : <React.Fragment>{viewRef.current.default()}</React.Fragment>;
};
export default InternalPageUI;