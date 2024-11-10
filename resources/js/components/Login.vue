<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-6 mt-2">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" name="email">
                            
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password">
                            
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <button class="btn btn-primary">Login</button>
                                </div>
                            </div>
                            <div class="col-md-6 text-right">
                                <router-link to="/register">Create New Account!</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
