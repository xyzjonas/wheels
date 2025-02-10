default:
  @just --choose

dev:
  npm run dev

[working-directory: 'pocketbase']
pb:
  ./pocketbase serve
  

docker-build-prod:
  docker build -t scotch3840/wheels .

docker-push:
  docker push scotch3840/wheels

docker: docker-build-prod
  docker push scotch3840/wheels
  
  

