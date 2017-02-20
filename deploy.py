from subprocess import call

call(['npm', 'run', 'build'])
call(['rsync', '-avzhe', 'ssh -p 2222', 'dist/index.html',
      'root@10.202.68.46:/srv/static/spring_2017/manage'])
call(['rsync', '-avzhe', 'ssh -p 2222', 'dist/static',
      'root@10.202.68.46:/srv/static/spring_2017/manage'])
