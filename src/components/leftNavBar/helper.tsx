export const renderIcon = (id: string) => {
  if (id === "it-general-controls") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-device-imac'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M3 4a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-12z' />
        <path d='M3 13h18' />
        <path d='M8 21h8' />
        <path d='M10 17l-.5 4' />
        <path d='M14 17l.5 4' />
      </svg>
    );
  } else if (id === "automated-business-controls") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-adjustments'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M6 4v4' />
        <path d='M6 12v8' />
        <path d='M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M12 4v10' />
        <path d='M12 18v2' />
        <path d='M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M18 4v1' />
        <path d='M18 9v11' />
      </svg>
    );
  } else if (id === "segragation-of-duties") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-binary-tree-2'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M14 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
        <path d='M7 14a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
        <path d='M21 14a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
        <path d='M14 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
        <path d='M12 8v8' />
        <path d='M6.316 12.496l4.368 -4.992' />
        <path d='M17.684 12.496l-4.366 -4.99' />
      </svg>
    );
  } else if (id === "irm-setup-admin") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-settings-cog'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12.003 21c-.732 .001 -1.465 -.438 -1.678 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886 .215 1.325 .957 1.318 1.694' />
        <path d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
        <path d='M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M19.001 15.5v1.5' />
        <path d='M19.001 21v1.5' />
        <path d='M22.032 17.25l-1.299 .75' />
        <path d='M17.27 20l-1.3 .75' />
        <path d='M15.97 17.25l1.3 .75' />
        <path d='M20.733 20l1.3 .75' />
      </svg>
    );
  } else if (id === "imatrix") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-brand-matrix'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M4 3h-1v18h1' />
        <path d='M20 21h1v-18h-1' />
        <path d='M7 9v6' />
        <path d='M12 15v-3.5a2.5 2.5 0 1 0 -5 0v.5' />
        <path d='M17 15v-3.5a2.5 2.5 0 1 0 -5 0v.5' />
      </svg>
    );
  } else if (id === "iassurance") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-thumb-up'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3' />
      </svg>
    );
  } else if (id === "erm") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-leaf'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M5 21c.5 -4.5 2.5 -8 7 -10' />
        <path d='M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z' />
      </svg>
    );
  } else if (id === "icertify") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-file-certificate'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M14 3v4a1 1 0 0 0 1 1h4' />
        <path d='M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5' />
        <path d='M6 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
        <path d='M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5' />
      </svg>
    );
  } else if (id === "irm-super-admin") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-user'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
        <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
      </svg>
    );
  } else if (id === "iaccess") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-fingerprint'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3' />
        <path d='M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6' />
        <path d='M12 11v2a14 14 0 0 0 2.5 8' />
        <path d='M8 15a18 18 0 0 0 1.8 6' />
        <path d='M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95' />
      </svg>
    );
  } else if (id === "developer") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-file-code-2'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M10 12h-1v5h1' />
        <path d='M14 12h1v5h-1' />
        <path d='M14 3v4a1 1 0 0 0 1 1h4' />
        <path d='M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z' />
      </svg>
    );
  } else if (id === "default") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-clipboard-list'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' />
        <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
        <path d='M9 12l.01 0' />
        <path d='M13 12l2 0' />
        <path d='M9 16l.01 0' />
        <path d='M13 16l2 0' />
      </svg>
    );
  } else if (id === "p-2-p") {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-shopping-cart-cog'
        width='25'
        height='25'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#868e96'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M12 17h-6v-14h-2' />
        <path d='M6 5l14 1l-.79 5.526m-3.21 1.474h-10' />
        <path d='M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M19.001 15.5v1.5' />
        <path d='M19.001 21v1.5' />
        <path d='M22.032 17.25l-1.299 .75' />
        <path d='M17.27 20l-1.3 .75' />
        <path d='M15.97 17.25l1.3 .75' />
        <path d='M20.733 20l1.3 .75' />
      </svg>
    );
  }
};
