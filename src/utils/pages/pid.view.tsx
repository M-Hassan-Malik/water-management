/* eslint-disable */
import { useRouter } from 'next/router';
import React, {  useEffect, useRef, useState } from 'react';

import { Core } from '@/components';
import { System } from '@/system';

import type { MainPageProps } from './pid.types';
import { useSelector } from 'react-redux';

const MainView = ({ }: MainPageProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const viewRef = useRef<any>();
  const [view, setView] = useState('')
  const user: IUser = useSelector((state: any) => state.user.user);
  
  let systemInstance;
  useEffect(() => {
    // pid as unknown as (EModuleViews | EOperationViews)
    const loadView = async () => {
      const { pid } = router.query;
      if (user) {
        systemInstance = System.getInstance(user)
        const view: any = await systemInstance.getView(pid as any);
        setView(view)
        viewRef.current = view;
      }
      setLoading(false);
    };

    if (!router.isReady) return;
    loadView();
  }, [router.isReady, router.query, user, view]);

  return loading ? <Core.LoadingComponent /> : <React.Fragment>{viewRef.current.default()}</React.Fragment>;
};

export default MainView;